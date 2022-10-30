import { add, differenceInCalendarDays } from "date-fns";

import { IResponseSearchFeed } from "../state/models/api/neoWsFeed";

import ENDPOINTS from "../core/api/endpoints";
import parseDateForAPI, { parseDateForDisplay } from "../utils/parseDates";
import { makeURL } from "../core/api/utils";
import ERRORS from "../utils/errors";
import { IError } from "../state/models/error";

export interface IQueryNEOData {
  startDate: Date;
  endDate: Date;
}

interface IFailedResponsesPackage {
  error: IError;
  data: { url?: URL; originalAPIResponse?: Response; rawData?: any };
}

type FailedDataPackage = { [key: string]: any };

interface IFetchNEODataPackagedData {
  successfulData: IResponseSearchFeed;
  failedData: FailedDataPackage;
}

const fetchNEOData = async (
  query: IQueryNEOData
): Promise<IFetchNEODataPackagedData> => {
  // ? This could be split into 3 files - the fetch and success/fail handlers

  const requestsQueue = getRequestsQueue(query);
  const requestResults = await fetchDataAsParallelRequests(requestsQueue);
  const { failed, succeeded } = await unpackResults(requestResults);

  // ? Process successful responses
  const successfulResponses = await extractSuccessfulResponses(succeeded);
  const successfulRawData = await extractData(successfulResponses);
  const repackedSuccessful = repackSuccessful(successfulRawData);

  // ? Process failure responses
  const failedReasons = await extractFailedReasons(failed);
  const repackedFailed = await repackFailData(failedReasons);

  return {
    failedData: repackedFailed,
    successfulData: repackedSuccessful,
  } as IFetchNEODataPackagedData;
};

const getRequestsQueue = (query: IQueryNEOData): URL[] => {
  const queryQueue = getQueryQueue(query);
  const urlQueue = getURLQueue(queryQueue);
  return urlQueue;
};

export const getQueryQueue = (originalQuery: IQueryNEOData) => {
  const queue = [] as IQueryNEOData[];

  let cursorStart = originalQuery.startDate;
  let cursorEnd = originalQuery.endDate;

  // ? This is the first time since forever that I used this anywhere
  // ? It could be done differently, but this is amusing
  do {
    const diffInDays = differenceInCalendarDays(cursorEnd, cursorStart);

    if (diffInDays <= 7) {
      const newQuery = {
        startDate: cursorStart,
        endDate: cursorEnd,
      } as IQueryNEOData;

      queue.push(newQuery);
    }

    if (diffInDays > 7) {
      cursorEnd = add(cursorStart, { days: 7 });

      const newQuery = {
        startDate: cursorStart,
        endDate: cursorEnd,
      } as IQueryNEOData;

      cursorStart = add(cursorEnd, { days: 1 });
      cursorEnd = originalQuery.endDate;
      queue.push(newQuery);
    }
  } while (!queue.find((e) => e.endDate === originalQuery.endDate));

  return queue;
};

const getURLQueue = (queryQueue: IQueryNEOData[]) => {
  const queue = [] as URL[];

  queryQueue.forEach((entry) => {
    const newUrl = makeURL({
      endpoint: ENDPOINTS.LIST,
      params: new Map<string, string>([
        ["start_date", parseDateForAPI(entry.startDate)],
        ["end_date", parseDateForAPI(entry.endDate)],
      ]),
    });

    queue.push(newUrl);
  });

  return queue;
};

const fetchDataAsParallelRequests = (urlQueue: URL[]) =>
  Promise.allSettled(
    urlQueue.map((url) =>
      fetch(url).then(async (response) => {
        if (response.status === 429) {
          const result = {
            error: ERRORS.REQUEST.EXCEEDED_API_USAGE,
            data: { url, originalAPIResponse: response },
          } as IFailedResponsesPackage;

          return Promise.reject(result);
        }

        if (response.status >= 400 && response.status <= 600) {
          const result = {
            error: ERRORS.REQUEST.UNEXPECTED_RESPONSE,
            data: { url, originalAPIResponse: response },
          } as IFailedResponsesPackage;

          return Promise.reject(result);
        }

        return response;
      })
    )
  );

const unpackResults = (results: PromiseSettledResult<Response>[]) => {
  const succeeded = results
    .filter((result) => result.status === "fulfilled")
    .filter((result) => {
      const actualResult = result as PromiseFulfilledResult<Response>;
      return actualResult.value.ok === true;
    }) as PromiseFulfilledResult<Response>[];

  const failed: PromiseSettledResult<Response>[] = [
    ...results.filter((result) => result.status === "rejected"),
    ...results
      .filter((result) => result.status === "fulfilled")
      .filter((result) => {
        const actualResult = result as PromiseFulfilledResult<Response>;
        return !actualResult.value.ok;
      }),
  ];

  return { failed, succeeded };
};

const extractSuccessfulResponses = async (
  data: PromiseFulfilledResult<Response>[]
) => data.map((entry) => entry.value);

const extractFailedReasons = async (data: PromiseSettledResult<Response>[]) =>
  data.map((entry) => {
    if (entry.status === "fulfilled") {
      return {
        error: ERRORS.REQUEST.UNEXPECTED_RESPONSE,
        data: {
          url: new URL(entry.value.url),
          originalAPIResponse: entry.value,
        },
      } as IFailedResponsesPackage;
    }

    if (entry.status === "rejected") {
      return entry.reason as IFailedResponsesPackage;
    }

    return {
      error: ERRORS.REQUEST.EXCEEDED_API_USAGE,
      data: { rawData: entry },
    } as IFailedResponsesPackage;
  });

const extractData = (
  resultsResponses: Response[]
): Promise<IResponseSearchFeed[]> =>
  Promise.all(resultsResponses.map((response) => response.json()));

const repackFailData = (failures: IFailedResponsesPackage[]) => {
  const repacked = failures.reduce((accumulator, current) => {
    const urlSearch = current.data.url?.search || "";

    const key = current.error.code;
    let [startDate, endDate] = urlSearch.split("&");
    startDate = startDate.split("=").pop() || "--";
    endDate = endDate.split("=").pop() || "--";

    accumulator[key] = [
      ...(accumulator[key] || []),
      {
        startDate: parseDateForDisplay(startDate),
        endDate: parseDateForDisplay(endDate),
        error: current.error,
        data: current.data.originalAPIResponse,
      },
    ] as FailedDataPackage;

    return accumulator;
  }, {} as FailedDataPackage);

  return repacked;
};

const repackSuccessful = (extracted: IResponseSearchFeed[]) => {
  const repacked = extracted.reduce(
    (accumulator, current) =>
      ({
        links: current.links,
        element_count: accumulator.element_count + current.element_count,
        near_earth_objects: {
          ...accumulator.near_earth_objects,
          ...current.near_earth_objects,
        },
      } as IResponseSearchFeed),
    { element_count: 0 } as IResponseSearchFeed
  );

  return repacked;
};

export default fetchNEOData;

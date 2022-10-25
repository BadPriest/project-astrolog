import { add, differenceInCalendarDays } from "date-fns";

import ENDPOINTS from "../core/api/endpoints";
import parseDateForAPI from "../utils/parseDates";
import { makeURL } from "../core/api/utils";
import { IResponseSearchFeed } from "../view/shared/interfaces/apiResponses/neoWsFeed";

export interface IQueryNEOData {
  startDate: Date;
  endDate: Date;
}

const fetchNEOData = async (query: IQueryNEOData) => {
  const queryQueue = getQueryQueue(query);
  const urlQueue = getURLQueue(queryQueue);
  const requestResults = await fetchDataAsParallelRequests(urlQueue);
  const { failed, succeeded } = await unpackResults(requestResults);
  const resultsResponses = await extractSuccessfulResponses(succeeded);
  const extractedRawData = await extractData(resultsResponses);

  return extractedRawData;
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
  Promise.allSettled(urlQueue.map((url) => fetch(url)));

const unpackResults = (results: PromiseSettledResult<Response>[]) => {
  const succeeded = results
    .filter((result) => result.status === "fulfilled")
    .filter((result) => {
      const actualResult = result as PromiseFulfilledResult<Response>;
      return actualResult.value.ok === true;
    }) as PromiseFulfilledResult<Response>[];

  const failed: PromiseSettledResult<Response>[] = results.filter(
    (result) => result.status === "rejected"
  );

  failed.concat(
    results
      .filter((result) => result.status === "fulfilled")
      .filter((result) => {
        const actualResult = result as PromiseFulfilledResult<Response>;
        return actualResult.value.ok === false;
      })
  );

  return { failed, succeeded };
};

const extractSuccessfulResponses = async (
  successfulData: PromiseFulfilledResult<Response>[]
) => successfulData.map((entry) => entry.value);

const extractData = (resultsResponses: Response[]) =>
  Promise.all(resultsResponses.map((response) => response.json()));

export default fetchNEOData;

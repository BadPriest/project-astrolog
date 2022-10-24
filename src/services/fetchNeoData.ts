import { add, differenceInCalendarDays } from "date-fns";
import ENDPOINTS from "../core/api/endpoints";
import { makeURL } from "../core/api/utils";
import parseDateForAPI from "../utils/parseDates";

export interface IQueryNEOData {
  startDate: Date;
  endDate: Date;
}

export const getQueryQueue = (originalQuery: IQueryNEOData) => {
  const queue = [] as IQueryNEOData[];

  let cursorStart = originalQuery.startDate;
  let cursorEnd = originalQuery.endDate;

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

const fetchNEOData = (query: IQueryNEOData) => {
  const { startDate, endDate } = query;

  const queryQueue = getQueryQueue(query);
  const urlQueue = getURLQueue(queryQueue);

  // TODO: Execute requests (parallel, serial, test)
  // TODO: Normalize responses
};

export default fetchNEOData;

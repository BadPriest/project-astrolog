import ENDPOINTS from "../core/api/endpoints";
import { makeURL } from "../core/api/utils";
import parseDateForAPI from "../utils/parseDates";

export interface IQueryNEOData {
  startDate: Date;
  endDate: Date;
}

const fetchNEOData = (query: IQueryNEOData) => {
  const { startDate, endDate } = query;

  const url = makeURL({
    endpoint: ENDPOINTS.LIST,
    params: new Map<string, string>([
      ["start_date", parseDateForAPI(startDate)],
      ["end_date", parseDateForAPI(endDate)],
    ]),
  });

  // TODO: Assemble request queue
  // TODO: Execute requests (parallel, serial, test)
  // TODO: Normalize responses
  
  console.log("url", url);
};

export default fetchNEOData;

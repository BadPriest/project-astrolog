import { IResponseSearchFeed } from "../models/api/neoWsFeed";
import { IRangeDate } from "../models/rangeDate";
import { ISearchMetadata } from "../models/searchMetadata";

export const normalizeSearchMetadata = (
  rawData: IResponseSearchFeed,
  originalQueryDateRange: IRangeDate
): ISearchMetadata => ({
  nearObjectsCount: rawData.element_count,
  originalQueryDateRange,
});

export default normalizeSearchMetadata;

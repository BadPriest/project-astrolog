import { IResponseSearchFeed } from "../../shared/interfaces/apiResponses/neoWsFeed";
import { IRangeDate } from "../../shared/interfaces/models/rangeDate";

export interface ISearchMetadata {
  nearObjectsCount: number;
  originalQueryDateRange: IRangeDate;
}

export const normalizeSearchMetadata = (
  rawData: IResponseSearchFeed,
  originalQueryDateRange: IRangeDate
): ISearchMetadata => ({
  nearObjectsCount: rawData.element_count,
  originalQueryDateRange,
});

export default normalizeSearchMetadata;

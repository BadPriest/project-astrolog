import { IResponseSearchFeed } from "../../shared/interfaces/apiResponses/neoWsFeed";
import { ISearchInterval } from "../SearchCloseObjects";

export interface ISearchMetadata {
  nearObjectsCount: number;
  dateIntervalUsed: ISearchInterval;
}

export const normalizeSearchMetadata = (
  rawData: IResponseSearchFeed,
  usedSearchInterval: ISearchInterval
): ISearchMetadata => ({
  nearObjectsCount: rawData.element_count,
  dateIntervalUsed: usedSearchInterval,
});

export default normalizeSearchMetadata;

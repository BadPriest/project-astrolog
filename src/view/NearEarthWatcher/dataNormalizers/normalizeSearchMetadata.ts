import { ISearchInterval } from "../SearchCloseObjects";

export interface ISearchMetadata {
  nearObjectsCount: number;
  dateIntervalUsed: ISearchInterval;
}

export const normalizeSearchMetadata = (
  rawData: any,
  usedSearchInterval: ISearchInterval
): ISearchMetadata => ({
  nearObjectsCount: rawData.element_count,
  dateIntervalUsed: usedSearchInterval,
});

export default normalizeSearchMetadata;

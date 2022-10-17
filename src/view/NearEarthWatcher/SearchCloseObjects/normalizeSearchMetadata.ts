import { ISearchInterval } from ".";

export interface ISearchMetadata {
  nearObjectsCount: number;
  interval: ISearchInterval;
}

export const normalizeSearchMetadata = (
  rawData: any,
  usedSearchInterval: ISearchInterval
): ISearchMetadata => ({
  nearObjectsCount: rawData.element_count,
  interval: usedSearchInterval,
});

export default normalizeSearchMetadata;

import { IResponseSearchFeed } from "../../shared/interfaces/apiResponses/neoWsFeed";
import { ISearchInputForm } from "../SearchNearEarthObjects/constants";

export interface ISearchMetadata {
  nearObjectsCount: number;
  searchInputForm: ISearchInputForm;
}

export const normalizeSearchMetadata = (
  rawData: IResponseSearchFeed,
  usedSearchInterval: ISearchInputForm
): ISearchMetadata => ({
  nearObjectsCount: rawData.element_count,
  searchInputForm: usedSearchInterval,
});

export default normalizeSearchMetadata;

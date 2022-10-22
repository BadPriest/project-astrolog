import { IResponseSearchFeed } from "../../shared/interfaces/apiResponses/neoWsFeed";
import { ISearchInputForm } from "../../shared/interfaces/models/searchInputForm";

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

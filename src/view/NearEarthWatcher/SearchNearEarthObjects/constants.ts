import React from "react";
import { ISearchInputForm } from "../../../state/models/searchInputForm";
import { ISearchMetadata } from "../../../state/models/searchMetadata";

export const DATE_INPUT_MIN_LENGTH = 8;

export const initialStateSearchInputForm = {
  isValid: false,
  input: {},
} as ISearchInputForm;

type ReactDispatchAlias = React.Dispatch<React.SetStateAction<any>>;
export type SearchResults = ReactDispatchAlias;
export type MetadataResults = ReactDispatchAlias;
export interface IPropsSearchNearObjects {
  setSearchResults: SearchResults;
  setSearchMetadata: MetadataResults;
}

export default IPropsSearchNearObjects;

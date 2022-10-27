import React from "react";
import { ISearchInputForm } from "../../../state/models/searchInputForm";

export const DATE_INPUT_MIN_LENGTH = 8;
export const DATE_RANGE_MAX_LENGTH_IN_DAYS = 180;

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

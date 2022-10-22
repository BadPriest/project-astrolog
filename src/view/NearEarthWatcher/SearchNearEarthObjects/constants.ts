import React from "react";
import { ISearchInputForm } from "../../shared/interfaces/models/searchInputForm";

export const DATE_INPUT_MIN_LENGTH = 8;

export const initialStateSearchInputForm = {
  isValid: false,
  input: {},
} as ISearchInputForm;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SearchResults = React.Dispatch<React.SetStateAction<any>>;
export interface IPropsSearchNearObjects {
  setSearchResults: SearchResults;
}

export default IPropsSearchNearObjects;

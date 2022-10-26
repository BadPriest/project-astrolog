import React from "react";
import { ISearchInputForm } from "../../../state/models/searchInputForm";

export const DATE_INPUT_MIN_LENGTH = 8;

export const initialStateSearchInputForm = {
  isValid: false,
  input: {},
} as ISearchInputForm;

export type SearchResults = React.Dispatch<React.SetStateAction<any>>;
export interface IPropsSearchNearObjects {
  setSearchResults: SearchResults;
}

export default IPropsSearchNearObjects;

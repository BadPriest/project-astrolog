import React from "react";

export const DATE_INPUT_MIN_LENGTH = 8;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SearchResults = React.Dispatch<React.SetStateAction<any>>;

export interface ISearchInputForm {
  initialDate?: string;
  finalDate?: string;
}

export interface IPropsSearchNearObjects {
  setSearchResults: SearchResults;
}

export default IPropsSearchNearObjects;

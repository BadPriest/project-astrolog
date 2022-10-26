import React, { useState } from "react";

import { MappedDataAlias } from "../../state/models/mappedDataAlias";
import { ISearchMetadata } from "../../state/models/searchMetadata";

import VSeparator from "../shared/VSeparator";
import DisplayMetadata from "./DisplayMetadata";
import ListCloseObjects from "./ListCloseObjects";
import SearchNearEarthObjects from "./SearchNearEarthObjects";

import StyledTitle from "./styles";

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();
  const [searchMetadata, setSearchMetadata] = useState<ISearchMetadata>();

  return (
    <>
      <StyledTitle>Near Earth Watcher</StyledTitle>
      <VSeparator height=".5rem" />
      <SearchNearEarthObjects
        setSearchResults={setSearchResults}
        setSearchMetadata={setSearchMetadata}
      />
      <VSeparator />
      <DisplayMetadata data={searchMetadata} />
      <VSeparator />
      <ListCloseObjects dataSet={searchResults} />
      <VSeparator />
    </>
  );
}

export default NearEarthWatcher;

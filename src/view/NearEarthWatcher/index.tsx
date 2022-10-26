import React, { useState } from "react";

import { MappedDataAlias } from "../../state/models/mappedDataAlias";

import VSeparator from "../shared/VSeparator";
import ListCloseObjects from "./ListCloseObjects";
import SearchNearEarthObjects from "./SearchNearEarthObjects";

import StyledTitle from "./styles";

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();

  return (
    <>
      <StyledTitle>Near Earth Watcher</StyledTitle>
      <VSeparator height=".5rem" />
      <SearchNearEarthObjects setSearchResults={setSearchResults} />
      <VSeparator />
      <ListCloseObjects dataSet={searchResults} />
      <VSeparator />
    </>
  );
}

export default NearEarthWatcher;

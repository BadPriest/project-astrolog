import React, { useState } from "react";

import VSeparator from "../shared/components/VSeparator";

import { MappedDataAlias } from "./dataNormalizers/normalizeNearEarthObjects";
import ListCloseObjects from "./ListCloseObjects";
import StyledTitle from "./styles";
import SearchNearEarthObjects from "./SearchNearEarthObjects";

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

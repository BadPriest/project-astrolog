import React, { useState } from "react";

import VSeparator from "../shared/components/VSeparator";
import SearchCloseObjects from "./SearchCloseObjects";

import { MappedDataAlias } from "./dataNormalizers/normalizeNearEarthObjects";
import ListCloseObjects from "./ListCloseObjects";
import StyledTitle from "./styles";

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();

  return (
    <>
      <StyledTitle>Near Earth Watcher</StyledTitle>
      <VSeparator height=".5rem" />
      <SearchCloseObjects setResults={setSearchResults} />
      <VSeparator />
      <ListCloseObjects dataSet={searchResults} />
      <VSeparator />
    </>
  );
}

export default NearEarthWatcher;

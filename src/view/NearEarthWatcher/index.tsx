import React, { useState } from "react";

import VSeparator from "../shared/components/VSeparator";
import SearchCloseObjects from "./SearchCloseObjects";

import { MappedDataAlias } from "./dataNormalizers/normalizeNearEarthObjects";
import ListCloseObjects from "./ListCloseObjects";

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();

  return (
    <>
      <h2>Near Earth Watcher</h2>
      <VSeparator height=".5rem" />
      <SearchCloseObjects setResults={setSearchResults} />
      <VSeparator />
      <ListCloseObjects dataSet={searchResults} />
      <VSeparator />
    </>
  );
}

export default NearEarthWatcher;

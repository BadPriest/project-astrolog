import React, { useState } from "react";

import VSeparator from "../shared/components/VSeparator";
import SearchCloseObjects from "./SearchCloseObjects";

import { MappedDataAlias } from "./dataNormalizers/normalizeNearEarthObjects";
import ListCloseObjects from "./ListCloseObjects";
import Title from "./styles";

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();

  return (
    <>
      <Title>Near Earth Watcher</Title>
      <VSeparator height=".5rem" />
      <SearchCloseObjects setResults={setSearchResults} />
      <VSeparator />
      <ListCloseObjects dataSet={searchResults} />
      <VSeparator />
    </>
  );
}

export default NearEarthWatcher;

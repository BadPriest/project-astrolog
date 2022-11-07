import React, { useState } from 'react';
import { FailedDataPackage } from '../../services/fetchNeoData';

import { MappedDataAlias } from '../../state/models/mappedDataAlias';
import { ISearchMetadata } from '../../state/models/searchMetadata';

import VSeparator from '../shared/VSeparator';
import ErrorMetadata from './DisplayMetadata/ErrorMetadata';
import SearchMetadata from './DisplayMetadata/SearchMetadata';
import ListCloseObjects from './ListCloseObjects';
import SearchNearEarthObjects from './SearchNearEarthObjects';

import StyledTitle from './styles';

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();
  const [searchMetadata, setSearchMetadata] = useState<ISearchMetadata>();
  const [errorMetadata, setErrorMetadata] = useState<FailedDataPackage>();

  return (
    <>
      <StyledTitle>Near Earth Watcher</StyledTitle>
      <VSeparator height=".5rem" />
      <SearchNearEarthObjects
        setSearchResults={setSearchResults}
        setSearchMetadata={setSearchMetadata}
        setErrorMetadata={setErrorMetadata}
      />
      <VSeparator />
      <ErrorMetadata data={errorMetadata} />
      <VSeparator
        height={errorMetadata && searchMetadata ? '2rem' : '0.2rem'}
      />
      <SearchMetadata data={searchMetadata} />
      <VSeparator height="0.2rem" />
      <ListCloseObjects dataSet={searchResults} />
      <VSeparator />
    </>
  );
}

export default NearEarthWatcher;

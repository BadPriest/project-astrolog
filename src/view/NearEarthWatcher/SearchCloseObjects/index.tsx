import React, { SyntheticEvent, useState } from "react";
import { ENDPOINTS } from "../../../core/api/endpoints";
import { makeURL } from "../../../core/api/utils";
import VSeparator from "../../shared/components/VSeparator";
import {
  MappedDataAlias,
  normalizeDataSet as normalizeSearchDataSet,
} from "./normalizeNearEarthObjects";
import normalizeSearchMetadata, {
  ISearchMetadata,
} from "./normalizeSearchMetadata";

import { WrapperInput, SearchForm, WrapperMetadata } from "./styles";

export interface ISearchInterval {
  initialDate?: string;
  finalDate?: string;
}

const initialSearchIntervalState = {
  initialDate: "1900-01-01",
  finalDate: "1900-01-05",
} as ISearchInterval;

enum STATE {
  LOADING = "loading",
  HAS_ERROR = "has_error",
  HAS_DATA = "has_data",
  IDLE = "idle",
}

interface IPropsSearchCloseObjects {
  setResults: React.Dispatch<React.SetStateAction<MappedDataAlias | undefined>>;
}

function SearchCloseObjects(props: IPropsSearchCloseObjects) {
  const { setResults } = props;
  const [searchInterval, setSearchInterval] = useState<ISearchInterval>(
    initialSearchIntervalState
  );

  const [state, setState] = useState<STATE>(STATE.IDLE);
  const [searchMetadata, setSearchMetadata] = useState<ISearchMetadata>();

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = { ...event };

    const newState = {
      ...searchInterval,
      [`${target.name}`]: target.value,
    } as ISearchInterval;

    setSearchInterval(newState);
  };

  const handleClicked = async (event: SyntheticEvent) => {
    event.preventDefault();

    // const rawData = await fetchData(searchInterval || {});
    const rawData = await fakeFetchData(searchInterval || {});

    if (rawData) {
      setState(STATE.HAS_DATA);
      processData(rawData);
    }
  };

  const processData = (rawData: any) => {
    const normalizedMetadata = normalizeSearchMetadata(rawData, searchInterval);
    setSearchMetadata(normalizedMetadata);

    const normalizedSearchDataSet = normalizeSearchDataSet(rawData);
    setResults(normalizedSearchDataSet);
  };

  const fetchData = async (interval: ISearchInterval) => {
    setState(STATE.LOADING);

    const url = makeURL({
      endpoint: ENDPOINTS.LIST,
      params: new Map<string, string>([
        ["start_date", interval?.initialDate || ""],
        ["end_date", interval?.finalDate || ""],
      ]),
    });

    const response = (await fetch(url)) as Response;

    if (response && !response.ok) {
      setState(STATE.HAS_ERROR);
      throw new Error(`[exception, HTTP] status: ${response.status}`);
    }

    return response.json();
  };

  const fakeFetchData = async (interval: ISearchInterval) => {
    setState(STATE.LOADING);

    setTimeout(() => ({}), 1000);

    const response = await fetch("demo-data.json");

    if (response && !response.ok) {
      setState(STATE.HAS_ERROR);
      throw new Error(`[exception, HTTP] status: ${response.status}`);
    }

    return response.json();
  };

  const searchIntervalIsIncomplete =
    !searchInterval || !searchInterval.initialDate || !searchInterval.finalDate;

  const shouldDisableButton =
    state === STATE.LOADING || searchIntervalIsIncomplete;

  return (
    <>
      <SearchForm>
        <WrapperInput>
          <label htmlFor="initialDate">Initial Date</label>
          <input
            type="text"
            placeholder="Input the initial date"
            name="initialDate"
            id="initialDate"
            value={searchInterval?.initialDate}
            onChange={handleInputChanged}
            disabled={state === STATE.LOADING}
          />
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="finalDate">Final Date</label>
          <input
            type="text"
            placeholder="Input the final date"
            name="finalDate"
            id="finalDate"
            value={searchInterval?.finalDate}
            onChange={handleInputChanged}
            disabled={state === STATE.LOADING}
          />
        </WrapperInput>
        <button
          type="submit"
          onClick={handleClicked}
          disabled={shouldDisableButton}
        >
          search
        </button>
        <VSeparator />
      </SearchForm>
      {state === STATE.HAS_DATA && (
        <WrapperMetadata>
          <p>
            Found {searchMetadata?.nearObjectsCount} entries for the given
            period{" "}
            {`${searchMetadata?.interval.initialDate} ~ ${searchMetadata?.interval.finalDate}`}
          </p>
        </WrapperMetadata>
      )}
    </>
  );
}

export default SearchCloseObjects;

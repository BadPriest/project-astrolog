import React, { SyntheticEvent, useState } from "react";
import { ENDPOINTS } from "../../../core/api/endpoints";
import { makeURL } from "../../../core/api/utils";
import VSeparator from "../../shared/components/VSeparator";
import normalizeDataSet, {
  MappedDataAlias,
} from "../dataNormalizers/normalizeNearEarthObjects";
import normalizeSearchMetadata, {
  ISearchMetadata,
} from "../dataNormalizers/normalizeSearchMetadata";

import { StyledWrapperInput, StyledSearchForm, StyledWrapperMetadata } from "./styles";

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

    const normalizedSearchDataSet = normalizeDataSet(rawData);
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
      <StyledSearchForm>
        <StyledWrapperInput>
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
        </StyledWrapperInput>
        <StyledWrapperInput>
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
        </StyledWrapperInput>
        <button
          type="submit"
          onClick={handleClicked}
          disabled={shouldDisableButton}
        >
          search
        </button>
        <VSeparator />
      </StyledSearchForm>
      {state === STATE.HAS_DATA && (
        <StyledWrapperMetadata>
          <p>
            Found {searchMetadata?.nearObjectsCount} entries for the given
            period{" "}
            {`${searchMetadata?.dateIntervalUsed.initialDate} ~ ${searchMetadata?.dateIntervalUsed.finalDate}`}
          </p>
        </StyledWrapperMetadata>
      )}
    </>
  );
}

export default SearchCloseObjects;

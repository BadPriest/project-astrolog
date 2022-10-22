import React, { SyntheticEvent, useState } from "react";
import { ENDPOINTS } from "../../../core/api/endpoints";
import { makeURL } from "../../../core/api/utils";

import { Button } from "../../shared/components/Button";
import InputDate from "../../shared/components/InputDate";
import Text from "../../shared/components/Text";
import VSeparator from "../../shared/components/VSeparator";

import { IResponseSearchFeed } from "../../shared/interfaces/apiResponses/neoWsFeed";
import normalizeDataSet, {
  MappedDataAlias,
} from "../dataNormalizers/normalizeNearEarthObjects";
import normalizeSearchMetadata, {
  ISearchMetadata,
} from "../dataNormalizers/normalizeSearchMetadata";

import DATE_INPUT_MIN_LENGTH from "./constants";

import {
  StyledWrapperInput,
  StyledSearchForm,
  StyledWrapperMetadata,
} from "./styles";

export interface ISearchInterval {
  initialDate: string;
  finalDate: string;
}

const initialSearchIntervalState = {
  initialDate: "01011900",
  finalDate: "01081900",
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

  const handleClickedFake = async (event: SyntheticEvent) => {
    event.preventDefault();

    const rawData = await fakeFetchData(searchInterval || {});

    if (rawData) {
      setState(STATE.HAS_DATA);
      processData(rawData as IResponseSearchFeed);
    }
  };

  const handleClicked = async (event: SyntheticEvent) => {
    event.preventDefault();

    const rawData = await fetchData(searchInterval || {});

    if (rawData) {
      setState(STATE.HAS_DATA);
      processData(rawData as IResponseSearchFeed);
    }
  };

  const processData = (rawData: IResponseSearchFeed) => {
    const normalizedMetadata = normalizeSearchMetadata(rawData, searchInterval);
    setSearchMetadata(normalizedMetadata);

    const normalizedSearchDataSet = normalizeDataSet(rawData);
    setResults(normalizedSearchDataSet);
  };

  const fetchData = async (
    interval: ISearchInterval
  ): Promise<IResponseSearchFeed> => {
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

  const fakeFetchData = async (
    interval: ISearchInterval
  ): Promise<IResponseSearchFeed> => {
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
          <InputDate
            label="Initial Date"
            placeholder="Input initial date"
            name="initialDate"
            id="initialDate"
            value={searchInterval?.initialDate}
            onChanged={handleInputChanged}
            disabled={state === STATE.LOADING}
            minLength={DATE_INPUT_MIN_LENGTH}
          />
        </StyledWrapperInput>
        <StyledWrapperInput>
          <InputDate
            label="Final Date"
            placeholder="Input final date"
            name="finalDate"
            id="finalDate"
            value={searchInterval?.finalDate}
            onChanged={handleInputChanged}
            disabled={state === STATE.LOADING}
            minLength={DATE_INPUT_MIN_LENGTH}
          />
        </StyledWrapperInput>
        <Button
          type="submit"
          onClick={handleClickedFake}
          disabled={shouldDisableButton}
        >
          search (local)
        </Button>
        <Button
          type="button"
          onClick={handleClicked}
          disabled={shouldDisableButton}
        >
          search (API)
        </Button>
        <VSeparator />
      </StyledSearchForm>
      {state === STATE.HAS_DATA && (
        <StyledWrapperMetadata>
          <Text>
            Found {searchMetadata?.nearObjectsCount} entries for the given
            period: {"  "}[
            {`${searchMetadata?.dateIntervalUsed.initialDate} ~ ${searchMetadata?.dateIntervalUsed.finalDate}`}
            ]
          </Text>
        </StyledWrapperMetadata>
      )}
    </>
  );
}

export default SearchCloseObjects;

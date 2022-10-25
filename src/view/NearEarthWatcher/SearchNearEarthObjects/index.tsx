import React, { useState } from "react";

import COMPONENT_STATES from "../../shared/utils/componentStates";
import ERRORS from "../../shared/errors";
import { ISearchInputForm } from "../../shared/interfaces/models/searchInputForm";
import IChangedInputDate from "../../shared/interfaces/models/inputDate";
import { IRangeDate } from "../../shared/interfaces/models/rangeDate";
import { Button } from "../../shared/components/Button";
import Text from "../../shared/components/Text";
import InputDate from "../../shared/components/InputDate";
import { parseDate } from "../../../utils/parseDates";

import FormDateValidator from "../../shared/validators/formDateValidator";
import { IValidationError } from "../../shared/interfaces/validationError";

import fetchNEOData, { IQueryNEOData } from "../../../services/fetchNeoData";
import { IResponseSearchFeed } from "../../shared/interfaces/apiResponses/neoWsFeed";

import normalizeDataSet from "../dataNormalizers/normalizeNearEarthObjects";
import normalizeSearchMetadata, {
  ISearchMetadata,
} from "../dataNormalizers/normalizeSearchMetadata";

import DisplayMetadata from "../DisplayMetadata";

import StyledSearchForm, { StyledWrapperFormErrors } from "./styles";

import {
  IPropsSearchNearObjects,
  DATE_INPUT_MIN_LENGTH,
  initialStateSearchInputForm,
} from "./constants";

function SearchNearEarthObjects(props: IPropsSearchNearObjects) {
  const { setSearchResults } = props;

  const [state, setState] = useState<COMPONENT_STATES>(COMPONENT_STATES.IDLE);
  const [error, setError] = useState<IValidationError | null>();
  const [searchMetadata, setSearchMetadata] =
    useState<ISearchMetadata | null>();

  const [searchInputForm, setSearchInputForm] = useState<ISearchInputForm>(
    initialStateSearchInputForm
  );

  const validateForm = (formState: ISearchInputForm) => {
    const validationErrors: IValidationError[] = FormDateValidator(formState);

    const currentForm = { ...formState };
    currentForm.isValid = !validationErrors?.length;
    currentForm.errors = validationErrors;

    return currentForm;
  };

  const handleInputChanged = (inputData: IChangedInputDate) => {
    const { name } = { ...inputData.inputStatus };

    const newState = {
      ...searchInputForm,
      input: {
        ...searchInputForm.input,
        [`${name}`]: inputData.inputStatus,
      },
    } as ISearchInputForm;

    const updatedForm = validateForm(newState);

    setSearchInputForm(() => updatedForm);
  };

  const handleSubmit = async () => {
    setState(() => COMPONENT_STATES.LOADING);
    setError(() => null);
    setSearchMetadata(() => null);
    setSearchResults(() => null);

    const { initialDate, finalDate } = handleEmptyInputs(searchInputForm);
    const { parsedInitialDate, parsedFinalDate } = parseDatesToQuery(
      initialDate,
      finalDate
    );

    const rawData: IResponseSearchFeed = await fetchNEOData({
      startDate: parsedInitialDate,
      endDate: parsedFinalDate,
    } as IQueryNEOData);

    if (!rawData) {
      setError(ERRORS.DATA.UNEXPECTED);
      setState(COMPONENT_STATES.HAS_ERROR);
    }

    const { metadata, data } = processData(rawData, { initialDate, finalDate });
    if (data && metadata) {
      setSearchMetadata(metadata);
      setSearchResults(data);

      setState(COMPONENT_STATES.DATA_LOADED);
    }

    // TODO: Display errors
    // TODO: Display feedback for failed requests
  };

  const handleEmptyInputs = (
    inputForm: ISearchInputForm
  ): { initialDate: string; finalDate: string } => {
    const initialDateInput = inputForm.input.initialDate?.value?.raw;
    const finalDateInput = inputForm.input.finalDate?.value?.raw;

    const dates = [initialDateInput, finalDateInput];

    const onlyOneInputIsGiven = dates.some((date) => !date);
    if (onlyOneInputIsGiven) {
      const onlyDateGiven = dates.filter((date) => !!date)[0];

      // TODO also update form input
      return { initialDate: onlyDateGiven, finalDate: onlyDateGiven };
    }

    const [initialDate, finalDate] = dates;
    return { initialDate, finalDate };
  };

  const parseDatesToQuery = (initialDate: string, finalDate: string) => ({
    parsedInitialDate: parseDate(initialDate),
    parsedFinalDate: parseDate(finalDate),
  });

  const processData = (
    rawData: IResponseSearchFeed,
    originalQueryDateRange: IRangeDate
  ) => {
    const metadata = normalizeSearchMetadata(rawData, originalQueryDateRange);
    const data = normalizeDataSet(rawData);
    return { metadata, data };
  };

  const shouldDisableButton =
    state === COMPONENT_STATES.LOADING || searchInputForm.isValid === false;

  return (
    <>
      <StyledSearchForm onSubmit={(e) => e.preventDefault()}>
        <InputDate
          label="Initial Date"
          placeholder="Input initial date"
          name="initialDate"
          id="initialDate"
          value={searchInputForm?.input?.initialDate?.value.raw}
          onChanged={handleInputChanged}
          disabled={state === COMPONENT_STATES.LOADING}
          minLength={DATE_INPUT_MIN_LENGTH}
        />
        <InputDate
          label="Final Date"
          placeholder="Input final date"
          name="finalDate"
          id="finalDate"
          value={searchInputForm?.input?.finalDate?.value.raw}
          onChanged={handleInputChanged}
          disabled={state === COMPONENT_STATES.LOADING}
          minLength={DATE_INPUT_MIN_LENGTH}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={shouldDisableButton}
        >
          search
        </Button>
      </StyledSearchForm>
      {!!searchInputForm.errors &&
        searchInputForm.errors.some((e) => !e.avoidFeedback) && (
          <StyledWrapperFormErrors>
            {searchInputForm.errors.map((formError) => (
              <Text key={formError.code}>{formError.message}</Text>
            ))}
          </StyledWrapperFormErrors>
        )}
      {state === COMPONENT_STATES.DATA_LOADED && searchMetadata && (
        <DisplayMetadata data={searchMetadata} />
      )}
    </>
  );
}

export default SearchNearEarthObjects;

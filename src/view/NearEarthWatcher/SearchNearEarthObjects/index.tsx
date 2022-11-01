import React, { useState } from "react";

import { IResponseSearchFeed } from "../../../state/models/api/neoWsFeed";
import COMPONENT_STATES from "../../../state/models/componentStates";
import IChangedInputDate from "../../../state/models/inputDate";
import { ISearchInputForm } from "../../../state/models/searchInputForm";
import { IError } from "../../../state/models/error";
import { IRangeDate } from "../../../state/models/rangeDate";

import InputDate from "../../shared/InputDate";
import FormErrorsFeedback from "../../shared/Feedback/FormErrorsFeedback";

import { parseDate } from "../../../utils/parseDates";
import FormDateValidator from "../../../utils/validators/formDateValidator";
import normalizeDataSet from "../../../state/normalizers/normalizeNearEarthObjects";
import normalizeSearchMetadata from "../../../state/normalizers/normalizeSearchMetadata";
import ERRORS from "../../../utils/errors";
import fetchNEOData, { IQueryNEOData } from "../../../services/fetchNeoData";

import StyledSearchForm, {
  StyledButton,
  StyledWrapperFinalDate,
  StyledWrapperFinalDateFeedback,
  StyledWrapperFormFeedback,
  StyledWrapperInitialDate,
  StyledWrapperInitialDateFeedback,
  StyledWrapperSubmitFeedback,
} from "./styles";

import IPropsSearchNearObjects, {
  DATE_INPUT_MIN_LENGTH,
  initialStateSearchInputForm,
} from "./constants";
import FeedbackDataLoading from "../../shared/Feedback/DataLoading";

function SearchNearEarthObjects(props: IPropsSearchNearObjects) {
  const { setSearchResults, setSearchMetadata, setErrorMetadata } = props;

  const [state, setState] = useState<COMPONENT_STATES>(COMPONENT_STATES.IDLE);
  const [error, setError] = useState<IError | null>();

  const [searchInputForm, setSearchInputForm] = useState<ISearchInputForm>(
    initialStateSearchInputForm
  );

  const validateForm = (formState: ISearchInputForm) => {
    const validationErrors: IError[] = FormDateValidator(formState);

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
    setErrorMetadata(() => null);
    setSearchResults(() => null);

    const { initialDate, finalDate } = handleEmptyInputs(searchInputForm);
    const { parsedInitialDate, parsedFinalDate } = parseDatesToQuery(
      initialDate,
      finalDate
    );

    const { failedData, successfulData } = await fetchNEOData({
      startDate: parsedInitialDate,
      endDate: parsedFinalDate,
    } as IQueryNEOData);

    if (!successfulData && !failedData) {
      setError(ERRORS.DATA.UNEXPECTED);
      setState(COMPONENT_STATES.HAS_ERROR);
    }

    let searchMetadataProcessed = false;
    let successfulDataProcessed = false;
    let errorDataProcessed = false;

    const metadata = normalizeSearchMetadata(successfulData, {
      initialDate,
      finalDate,
    });

    setSearchMetadata(metadata);
    searchMetadataProcessed = true;

    if (successfulData?.element_count) {
      const data = normalizeDataSet(successfulData);
      if (data) {
        setSearchResults(data);
      }

      if (data) {
        successfulDataProcessed = true;
      }
    }

    if (failedData) {
      setErrorMetadata(failedData);
      errorDataProcessed = true;
    }

    if (
      searchMetadataProcessed ||
      successfulDataProcessed ||
      errorDataProcessed
    ) {
      setState(COMPONENT_STATES.DATA_LOADED);
    }
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

  const shouldDisableButton =
    state === COMPONENT_STATES.LOADING || searchInputForm.isValid === false;

  return (
    <StyledSearchForm onSubmit={(e) => e.preventDefault()}>
      <StyledWrapperInitialDate>
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
      </StyledWrapperInitialDate>

      <StyledWrapperFinalDate>
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
      </StyledWrapperFinalDate>

      <StyledButton
        type="submit"
        onClick={handleSubmit}
        disabled={shouldDisableButton}
      >
        search
      </StyledButton>

      {state === COMPONENT_STATES.LOADING && (
        <StyledWrapperSubmitFeedback>
          <FeedbackDataLoading />
        </StyledWrapperSubmitFeedback>
      )}

      <StyledWrapperInitialDateFeedback>
        <FormErrorsFeedback
          errors={searchInputForm.input.initialDate?.status?.errors}
        />
      </StyledWrapperInitialDateFeedback>
      <StyledWrapperFinalDateFeedback>
        <FormErrorsFeedback
          errors={searchInputForm.input.finalDate?.status?.errors}
        />
      </StyledWrapperFinalDateFeedback>
      <StyledWrapperFormFeedback>
        <FormErrorsFeedback errors={searchInputForm.errors} />
      </StyledWrapperFormFeedback>
    </StyledSearchForm>
  );
}

export default SearchNearEarthObjects;

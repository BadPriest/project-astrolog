import React, { useState } from "react";

import COMPONENT_STATES from "../../shared/utils/componentStates";
import { ISearchInputForm } from "../../shared/interfaces/models/searchInputForm";
import { Button } from "../../shared/components/Button";
import InputDate from "../../shared/components/InputDate";
import IChangedInputDate from "../../shared/interfaces/models/inputDate";
import DisplayMetadata from "../DisplayMetadata";

import StyledSearchForm, { StyledWrapperFormErrors } from "./styles";

import {
  IPropsSearchNearObjects,
  DATE_INPUT_MIN_LENGTH,
  initialStateSearchInputForm,
} from "./constants";
import FormDateValidator from "../../shared/validators/formDateValidator";
import { IValidationError } from "../../shared/interfaces/validationError";
import Text from "../../shared/components/Text";
import fetchNEOData, { IQueryNEOData } from "../../../services/fetchNeoData";
import { parseDate } from "../../../utils/parseDates";

function SearchNearEarthObjects(props: IPropsSearchNearObjects) {
  const [searchInputForm, setSearchInputForm] = useState<ISearchInputForm>(
    initialStateSearchInputForm
  );

  const [state, setState] = useState<COMPONENT_STATES>(COMPONENT_STATES.IDLE);

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

  const handleSubmit = () => {
    setState(() => COMPONENT_STATES.LOADING);

    const { initialDate, finalDate } = handleEmptyInputs(searchInputForm);
    const { parsedInitialDate, parsedFinalDate } = parseDatesToQuery(
      initialDate,
      finalDate
    );

    const result = fetchNEOData({
      startDate: parsedInitialDate,
      endDate: parsedFinalDate,
    } as IQueryNEOData);

    // TODO: Display results metadata
    // TODO: Display results
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

  // const parseFormToQuery = (inputForm: ISearchInputForm) => {
  //   let initialDate = parseDate(inputInitialDate);
  //   let finalDate;

  //   const inputInitialDate = inputForm.input.initialDate.value.raw;
  //   if (inputInitialDate) {
  //     initialDate = parseDate(inputInitialDate);
  //   }

  //   const inputFinalDate = inputForm.input.finalDate.value.raw;
  //   if (inputFinalDate) {
  //     finalDate = parseDate(inputFinalDate);
  //   }

  //   const dates = [initialDate, finalDate];

  //   // If any date is empty, fill it with
  //   if (dates.some((date) => !date)) {
  //     const dateFilled = dates.filter((date) => !!date);
  //     return dates.map(() => dateFilled);
  //   }

  //   // return [initialDate, finalDate].map(date => )
  // };

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
            {searchInputForm.errors.map((error) => (
              <Text key={error.code}>{error.message}</Text>
            ))}
          </StyledWrapperFormErrors>
        )}
      <DisplayMetadata />
    </>
  );
}

export default SearchNearEarthObjects;

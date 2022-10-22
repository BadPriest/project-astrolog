import React, { useState } from "react";

import COMPONENT_STATES from "../../shared/utils/componentStates";
import { ISearchInputForm } from "../../shared/interfaces/models/searchInputForm";
import { Button } from "../../shared/components/Button";
import InputDate from "../../shared/components/InputDate";
import IChangedInputDate from "../../shared/interfaces/models/inputDate";
import DisplayMetadata from "../DisplayMetadata";

import StyledSearchForm from "./styles";

import {
  IPropsSearchNearObjects,
  DATE_INPUT_MIN_LENGTH,
  initialStateSearchInputForm,
} from "./constants";
import FormDateValidator from "../../shared/validators/formDateValidator";
import { IValidationError } from "../../shared/interfaces/validationError";

function SearchNearEarthObjects(props: IPropsSearchNearObjects) {
  const [searchInputForm, setSearchInputForm] = useState<ISearchInputForm>(
    initialStateSearchInputForm
  );

  const [state, setState] = useState<COMPONENT_STATES>(COMPONENT_STATES.IDLE);

  const validateForm = (formState: ISearchInputForm) => {
    const validationErrors: IValidationError[] = FormDateValidator(formState);

    return { isValid: !validationErrors?.length, validationErrors };
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

    const { isValid, validationErrors } = validateForm(newState);
    newState.isValid = isValid;
    newState.errors = validationErrors;

    setSearchInputForm(() => newState);
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
          onClick={() => console.log("hey")}
          disabled={shouldDisableButton}
        >
          search
        </Button>
      </StyledSearchForm>

      <DisplayMetadata />
    </>
  );
}

export default SearchNearEarthObjects;

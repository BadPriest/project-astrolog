import React, { useState } from "react";

import COMPONENT_STATES from "../../shared/utils/componentStates";
import { ISearchInputForm } from "../../shared/interfaces/models/searchInputForm";
import { Button } from "../../shared/components/Button";
import InputDate from "../../shared/components/InputDate";
import IChangedInputDate from "../../shared/interfaces/models/inputDate";
import DisplayMetadata from "../DisplayMetadata";

import StyledSearchForm from "./styles";

import { IPropsSearchNearObjects, DATE_INPUT_MIN_LENGTH } from "./constants";

function SearchNearEarthObjects(props: IPropsSearchNearObjects) {
  const [searchInputForm, setSearchInputForm] = useState<ISearchInputForm>();

  const [state, setState] = useState<COMPONENT_STATES>(COMPONENT_STATES.IDLE);

  const handleInputChanged = (inputData: IChangedInputDate) => {
    const { name, value } = { ...inputData.inputStatus };

    const newState = {
      ...searchInputForm,
      [`${name}`]: value.raw,
    } as ISearchInputForm;

    setSearchInputForm(newState);
  };

  return (
    <>
      <StyledSearchForm onSubmit={(e) => e.preventDefault()}>
        <InputDate
          label="Initial Date"
          placeholder="Input initial date"
          name="initialDate"
          id="initialDate"
          value={searchInputForm?.initialDate}
          onChanged={handleInputChanged}
          disabled={state === COMPONENT_STATES.LOADING}
          minLength={DATE_INPUT_MIN_LENGTH}
        />
        <InputDate
          label="Final Date"
          placeholder="Input final date"
          name="finalDate"
          id="finalDate"
          value={searchInputForm?.finalDate}
          onChanged={handleInputChanged}
          disabled={state === COMPONENT_STATES.LOADING}
          minLength={DATE_INPUT_MIN_LENGTH}
        />
        <Button type="submit" onClick={() => console.log("hey")}>
          search
        </Button>
      </StyledSearchForm>
      <DisplayMetadata />
    </>
  );
}

export default SearchNearEarthObjects;

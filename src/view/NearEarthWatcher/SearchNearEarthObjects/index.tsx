import React, { useState } from "react";
import { Button } from "../../shared/components/Button";
import InputDate from "../../shared/components/InputDate";
import IChangedInputDate, {
  IInputDateData,
} from "../../shared/components/InputDate/constants";
import COMPONENT_STATES from "../../shared/utils/componentStates";

import {
  DATE_INPUT_MIN_LENGTH,
  IPropsSearchNearObjects,
  ISearchInputForm,
} from "./constants";

import StyledSearchForm from "./styles";

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
  );
}

export default SearchNearEarthObjects;

import React, { ReactNode, useState } from "react";

import Label from "../FormControlLabel";

import { StyledWrapper, StyledMaskedInputDate } from "./styles";

import ddMMyyyyInputMask from "./constants";
import { IError } from "../../../state/models/error";
import InputDateValidator from "../../../utils/validators/inputDateValidator";
import IChangedInputDate from "../../../state/models/inputDate";

export interface IPropsInput {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onChanged: (inputData: IChangedInputDate) => void;
  value: ReactNode | any;
  disabled: boolean;
  minLength: number;
}

function InputDate(props: IPropsInput) {
  const {
    id,
    name,
    label,
    placeholder,
    onChanged,
    value,
    disabled,
    minLength = 8,
  } = props;

  const [errors, setErrors] = useState<IError[]>([]);

  const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    const validationErrors: IError[] = InputDateValidator(inputValue, props);

    const newInputData = {
      event: { ...event },
      inputStatus: {
        name,
        value: {
          raw: inputValue,
        },
        status: {
          isValid: !validationErrors || !!validationErrors.length === false,
          errors: validationErrors,
        },
      },
    } as IChangedInputDate;

    setErrors([...validationErrors]);
    onChanged(newInputData);
  };

  return (
    <StyledWrapper>
      <Label htmlFor={id}>{label}</Label>
      <StyledMaskedInputDate
        mask={ddMMyyyyInputMask}
        guide
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChanged}
        disabled={disabled}
        minLength={minLength}
      />
    </StyledWrapper>
  );
}

export default InputDate;

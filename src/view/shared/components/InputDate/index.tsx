import React, { ReactNode, useState } from "react";
import { IValidationError } from "../../interfaces/validationError";
import DateValidator from "../../validators/dateValidator";

import Label from "../FormControlLabel";
import Text from "../Text";
import { ddMMyyyyInputMask } from "./constants";

import StyledMaskedInputDate, { StyledErrorWrapper } from "./styles";

export interface IPropsInput {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

  const [errors, setErrors] = useState<IValidationError[]>([]);

  const validateInput = (inputValue: string) => {
    const results = DateValidator(inputValue, props);
    setErrors(() => [...results]);
  };

  const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    validateInput(inputValue);

    onChanged(event);
  };

  return (
    <>
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
      {errors?.length > 0 && (
        <StyledErrorWrapper>
          {errors.map((error) => (
            <Text key={error.code}>{error.message}</Text>
          ))}
        </StyledErrorWrapper>
      )}
    </>
  );
}

export default InputDate;

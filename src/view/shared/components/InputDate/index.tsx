import React, { ReactNode, useState } from "react";
import IChangedInputDate from "../../interfaces/models/inputDate";
import { IValidationError } from "../../interfaces/validationError";
import DateValidator from "../../validators/dateValidator";

import Label from "../FormControlLabel";
import Text from "../Text";
import { ddMMyyyyInputMask } from "./constants";
import {
  StyledWrapper,
  StyledMaskedInputDate,
  StyledErrorWrapper,
} from "./styles";

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

  const [errors, setErrors] = useState<IValidationError[]>([]);

  const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    const validationErrors: IValidationError[] = DateValidator(
      inputValue,
      props
    );

    const newInputData = {
      event,
      inputStatus: {
        name,
        value: {
          raw: value,
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
      {errors?.length > 0 && (
        <StyledErrorWrapper>
          {errors.map((error) => (
            <Text key={error.code}>{error.message}</Text>
          ))}
        </StyledErrorWrapper>
      )}
    </StyledWrapper>
  );
}

export default InputDate;

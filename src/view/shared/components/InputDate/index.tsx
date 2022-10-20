import React, { ReactNode } from "react";

import Label from "../FormControlLabel";
import { ddMMyyyyInputMask } from "./constants";

import StyledMaskedInputDate from "./styles";

export interface IPropsInput {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: ReactNode | any;
  disabled: boolean;
}

function InputDate(props: IPropsInput) {
  const { id, name, label, placeholder, onChanged, value, disabled } = props;

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <StyledMaskedInputDate
        mask={[...ddMMyyyyInputMask]}
        guide
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChanged}
        disabled={disabled}
      />
    </>
  );
}

export default InputDate;

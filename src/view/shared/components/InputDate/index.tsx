import React, { ReactNode } from "react";
import Label from "../FormControlLabel";
import StyledInputDate from "./styles";

export interface IPropsInput {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: ReactNode | any;
  disabled: boolean;
}

function InputDate({
  id,
  name,
  label,
  placeholder,
  onChanged,
  value,
  disabled,
}: IPropsInput) {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <StyledInputDate
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

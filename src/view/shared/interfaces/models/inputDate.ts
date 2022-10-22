import React from "react";
import { IValidationError } from "../validationError";

export interface IInputDataDate {
  name: string;
  value: {
    raw: string;
    parsed?: Date;
  };
  status: {
    isValid?: boolean;
    errors?: IValidationError[];
  };
}

export interface IChangedInputDate {
  event: React.ChangeEvent<HTMLInputElement>;
  inputStatus: IInputDataDate;
}

export default IChangedInputDate;

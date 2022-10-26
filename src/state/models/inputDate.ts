import React from "react";

import { IError } from "./error";

export interface IInputDataDate {
  name: string;
  value: {
    raw: string;
    parsed?: Date;
  };
  status: {
    isValid?: boolean;
    errors?: IError[];
  };
}

export interface IChangedInputDate {
  event: React.ChangeEvent<HTMLInputElement>;
  inputStatus: IInputDataDate;
}

export default IChangedInputDate;

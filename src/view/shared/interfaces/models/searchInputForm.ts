import { IValidationError } from "../validationError";
import { IInputDataDate } from "./inputDate";

export interface ISearchInputForm {
  isValid: boolean;
  errors?: IValidationError[];
  input: {
    initialDate: IInputDataDate;
    finalDate: IInputDataDate;
  };
}

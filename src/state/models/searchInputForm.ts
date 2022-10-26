import { IError } from "./error";
import { IInputDataDate } from "./inputDate";

export interface ISearchInputForm {
  isValid: boolean;
  errors?: IError[];
  input: {
    initialDate: IInputDataDate;
    finalDate: IInputDataDate;
  };
}

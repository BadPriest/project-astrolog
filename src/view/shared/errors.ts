import { IValidationError } from "./interfaces/validationError";

export const ERRORS = {
  INPUT: {
    INCOMPLETE: {
      code: "001",
      message: "DATE_INCOMPLETE: Insert full date - try 01.01.1900",
    } as IValidationError,
    INVALID_DATE: {
      code: "002",
      message: "DATE_INVALID: Input is not recognizable as a true date",
    } as IValidationError,
  },
};

export default ERRORS;

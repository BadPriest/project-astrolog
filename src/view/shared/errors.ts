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
  FORM: {
    INVALID: {
      code: "003",
      message: "FORM_INVALID: Information is not properly arranged.",
    } as IValidationError,
  },
};

export default ERRORS;

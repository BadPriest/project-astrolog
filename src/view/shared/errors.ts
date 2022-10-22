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
      avoidFeedback: true,
    } as IValidationError,
    EMPTY: {
      code: "004",
      message: "FORM_EMPTY: Both inputs are empty",
      avoidFeedback: true,
    } as IValidationError,
    IMPOSSIBLE_RANGE: {
      code: "005",
      message: "IMPOSSIBLE_RANGE: The final date should come after the initial",
    } as IValidationError,
  },
};

export default ERRORS;

import { IError } from "../state/models/error";

export const ERRORS = {
  INPUT: {
    INCOMPLETE: {
      code: "001",
      message: "DATE_INCOMPLETE: Insert full date - try 01.01.1900",
    } as IError,
    INVALID_DATE: {
      code: "002",
      message: "DATE_INVALID: Input is not recognizable as a true date",
    } as IError,
  },
  FORM: {
    INVALID: {
      code: "003",
      message: "FORM_INVALID: Information is not properly arranged.",
      avoidFeedback: true,
    } as IError,
    EMPTY: {
      code: "004",
      message: "FORM_EMPTY: Both inputs are empty",
      avoidFeedback: true,
    } as IError,
    IMPOSSIBLE_RANGE: {
      code: "005",
      message: "IMPOSSIBLE_RANGE: The final date should come after the initial",
    } as IError,
    EXCEEDED_RANGE: {
      code: "007",
      message: "EXCEEDED_RANGE: Date range cannot exceed 180 days at a time",
    },
  },
  DATA: {
    UNEXPECTED: {
      code: "006",
      message: "UNEXPECTED_DATA: The data is not what we expected",
    } as IError,
  },
  REQUEST: { 
    UNEXPECTED_RESPONSE: {
      code: "008",
      message: 'UNEXPECTED_RESPONSE: Server unswer in an unexpected manner'
    } as IError,
    EXCEEDED_API_USAGE: {
      code: '009',
      message: 'EXCEEDED_API_USAGE: Data access expired due to excessive usage. Please try again later'
     } as IError,
  }
};

export default ERRORS;

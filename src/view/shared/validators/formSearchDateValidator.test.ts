import { IInputDataDate } from "../interfaces/models/inputDate";
import { ISearchInputForm } from "../interfaces/models/searchInputForm";
import { IValidationError } from "../interfaces/validationError";
import FormDateValidator from "./formDateValidator";

test("Having some input in valid state and none invalid shows no error", () => {
  const mockFormValues = {
    isValid: false,
    input: {
      initialDate: {
        name: "initialDate",
        status: { isValid: true, errors: [] },
        value: { raw: "01.01.1900" },
      } as IInputDataDate,
    },
  } as ISearchInputForm;

  const actualResult = FormDateValidator(mockFormValues);
  const expected = [] as IValidationError[];

  expect(actualResult).toEqual(expected);
});

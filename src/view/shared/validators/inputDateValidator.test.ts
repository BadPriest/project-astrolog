import { conformToMask } from "react-text-mask";

import { ERRORS } from "../errors";
import { IValidationError } from "../interfaces/validationError";
import { fixtureInputProps, DATE_MASK } from "./constants";

import DateValidator from "./dateValidator";

test("Date input accepts only digits", () => {
  const actualResult = conformToMask("_QWERTY.!@#", DATE_MASK);
  const expected = conformToMask("", DATE_MASK).conformedValue;

  expect(actualResult.meta.someCharsRejected).toBe(true);
  expect(actualResult.conformedValue).toBe(expected);
});

test("Incomplete inputs receive appropriate error", () => {
  const mockInputValue = conformToMask("01", DATE_MASK).conformedValue;
  const actualResult = DateValidator(mockInputValue, fixtureInputProps);

  const expected = [ERRORS.INPUT.INCOMPLETE] as IValidationError[];

  expect(actualResult).toEqual(expected);
});

test("Invalid dates receive appropriate error", () => {
  const mockInputValue = conformToMask("48340000", DATE_MASK).conformedValue;
  const actualResult = DateValidator(mockInputValue, fixtureInputProps);

  const expected = [ERRORS.INPUT.INVALID_DATE] as IValidationError[];

  expect(actualResult).toEqual(expected);
});

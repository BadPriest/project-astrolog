import { conformToMask } from "react-text-mask";
import { IError } from "../../state/models/error";

import { ERRORS } from "../errors";
import { fixtureInputProps, DATE_MASK } from "./constants";

import InputDateValidator from "./inputDateValidator";

test("Date input accepts only digits", () => {
  const actualResult = conformToMask("_QWERTY.!@#", DATE_MASK);
  const expected = conformToMask("", DATE_MASK).conformedValue;

  expect(actualResult.meta.someCharsRejected).toBe(true);
  expect(actualResult.conformedValue).toBe(expected);
});

test("Completely empty inputs display no error", () => {
  const mockInputValue = conformToMask("", DATE_MASK).conformedValue;

  const actualResult = InputDateValidator(mockInputValue, fixtureInputProps);
  const expected = [] as IError[];

  expect(actualResult).toEqual(expected);
});

test("Incomplete inputs receive appropriate error", () => {
  const mockInputValue = conformToMask("01", DATE_MASK).conformedValue;
  const actualResult = InputDateValidator(mockInputValue, fixtureInputProps);

  const expected = [ERRORS.INPUT.INCOMPLETE] as IError[];

  expect(actualResult).toEqual(expected);
});

test("Invalid dates receive appropriate error", () => {
  const mockInputValue = conformToMask("48340000", DATE_MASK).conformedValue;
  const actualResult = InputDateValidator(mockInputValue, fixtureInputProps);

  const expected = [ERRORS.INPUT.INVALID_DATE] as IError[];

  expect(actualResult).toEqual(expected);
});

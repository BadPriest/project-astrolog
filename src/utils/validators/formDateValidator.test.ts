import { IInputDataDate } from "../../state/models/inputDate";
import { ISearchInputForm } from "../../state/models/searchInputForm";
import { IError } from "../../state/models/error";
import ERRORS from "../errors";

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
  const expected = [] as IError[];

  expect(actualResult).toEqual(expected);
});

test("Having both inputs empty invalidates form", () => {
  const mockFormValues = {
    isValid: false,
    input: {},
  } as ISearchInputForm;

  const actualResult = FormDateValidator(mockFormValues);
  const expected = [ERRORS.FORM.EMPTY] as IError[];

  expect(actualResult).toEqual(expected);
});

test("Inputs having equal dates should be valid", () => {
  const mockFormValues = {
    isValid: true,
    input: {
      initialDate: {
        name: "initialDate",
        status: { isValid: true, errors: [] },
        value: { raw: "01.01.1900" },
      } as IInputDataDate,
      finalDate: {
        name: "finalDate",
        status: { isValid: true, errors: [] },
        value: { raw: "01.01.1900" },
      } as IInputDataDate,
    },
  } as ISearchInputForm;

  const actualResult = FormDateValidator(mockFormValues);
  const expected = [] as IError[];

  expect(actualResult).toEqual(expected);
});

test("Having the final date before the initial invalidates form", () => {
  const mockFormValues = {
    isValid: true,
    input: {
      initialDate: {
        name: "initialDate",
        status: { isValid: true, errors: [] },
        value: { raw: "01.01.1900" },
      } as IInputDataDate,
      finalDate: {
        name: "finalDate",
        status: { isValid: true, errors: [] },
        value: { raw: "31.12.1800" },
      } as IInputDataDate,
    },
  } as ISearchInputForm;

  const actualResult = FormDateValidator(mockFormValues);
  const expected = [ERRORS.FORM.IMPOSSIBLE_RANGE] as IError[];

  expect(actualResult).toEqual(expected);
});

test("Range cannot exceed 180 days", () => {
  const mockFormValues = {
    isValid: true,
    input: {
      initialDate: {
        name: "initialDate",
        status: { isValid: true, errors: [] },
        value: { raw: "01.01.1900" },
      } as IInputDataDate,
      finalDate: {
        name: "finalDate",
        status: { isValid: true, errors: [] },
        value: { raw: "01.07.1900" },
      } as IInputDataDate,
    },
  } as ISearchInputForm;

  const actualResult = FormDateValidator(mockFormValues);
  const expected = [ERRORS.FORM.EXCEEDED_RANGE] as IError[];

  expect(actualResult).toEqual(expected);
});

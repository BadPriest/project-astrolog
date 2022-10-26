/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValid, parse } from "date-fns";

import { IPropsInput } from "../../view/shared/InputDate";
import { IError } from "../../state/models/error";

import ERRORS from "../errors";

const removeDateInputMask = (maskedInputValue: string) =>
  maskedInputValue.replace(/\D/g, "");

const validateMinLength = (inputValue: string, props: IPropsInput) => {
  const { minLength } = props;
  const unmaskedValue = removeDateInputMask(inputValue);

  const inputIsComplete = !unmaskedValue || unmaskedValue?.length === minLength;

  return inputIsComplete ? undefined : (ERRORS.INPUT.INCOMPLETE as IError);
};

const validateDate = (inputValue: string, props: IPropsInput) => {
  const { minLength } = props;
  const unmaskedValue = removeDateInputMask(inputValue);

  const isFilledDateInput = unmaskedValue?.length === minLength;
  if (!isFilledDateInput) {
    return undefined;
  }

  try {
    const parsedDate = parse(inputValue, "dd.MM.yyyy", new Date());
    const isValidDate = isValid(parsedDate);

    return isValidDate ? undefined : (ERRORS.INPUT.INVALID_DATE as IError);
  } catch (error) {
    return ERRORS.INPUT.INVALID_DATE as IError;
  }
};

export function InputDateValidator(
  inputValue: string,
  props: IPropsInput,
  validations = [validateMinLength, validateDate]
) {
  const results: IError[] = [];

  validations.forEach((validator) => {
    const result = validator(inputValue, props) as IError;
    if (result) {
      results.push(result);
    }
  });

  return results;
}

export default InputDateValidator;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValid, parse } from "date-fns";
import { IPropsInput } from "../components/InputDate";
import ERRORS from "../errors";
import { IValidationError } from "../interfaces/validationError";

const removeDateInputMask = (maskedInputValue: string) =>
  maskedInputValue.replace(/\D/g, "");

const validateMinLength = (inputValue: string, props: IPropsInput) => {
  const { minLength } = props;
  const unmaskedValue = removeDateInputMask(inputValue);

  const inputIsComplete = unmaskedValue?.length === minLength;

  return inputIsComplete
    ? undefined
    : (ERRORS.INPUT.INCOMPLETE as IValidationError);
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

    return isValidDate
      ? undefined
      : (ERRORS.INPUT.INVALID_DATE as IValidationError);
  } catch (error) {
    return ERRORS.INPUT.INVALID_DATE as IValidationError;
  }
};

export function DateValidator(
  inputValue: string,
  props: IPropsInput,
  validations = [validateMinLength, validateDate]
) {
  const results: IValidationError[] = [];

  validations.forEach((validator) => {
    const result = validator(inputValue, props) as IValidationError;
    if (result) {
      results.push(result);
    }
  });

  return results;
}

export default DateValidator;

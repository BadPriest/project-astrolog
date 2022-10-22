import { isBefore, isEqual, parse } from "date-fns";
import ERRORS from "../errors";
import { IInputDataDate } from "../interfaces/models/inputDate";
import { ISearchInputForm } from "../interfaces/models/searchInputForm";
import { IValidationError } from "../interfaces/validationError";

const getInputvalues = (formValue: ISearchInputForm) => {
  const inputValues: IInputDataDate[] = [];

  if (formValue.input.initialDate) {
    inputValues.push(formValue.input.initialDate);
  }

  if (formValue.input.finalDate) {
    inputValues.push(formValue.input.finalDate);
  }

  return inputValues;
};

const parseDates = (formValue: ISearchInputForm) => {
  const dateFormat = "dd.MM.yyyy";

  let parsedInitialDate = null;
  let parsedFinalDate = null;

  if (formValue.input.initialDate) {
    parsedInitialDate = parse(
      formValue.input.initialDate?.value?.raw,
      dateFormat,
      new Date()
    );
  }

  if (formValue.input.finalDate) {
    parsedFinalDate = parse(
      formValue.input.finalDate?.value?.raw,
      dateFormat,
      new Date()
    );
  }

  return { parsedInitialDate, parsedFinalDate };
};

const validateAllowSingleInput = (formValue: ISearchInputForm) => {
  const inputValues = getInputvalues({ ...formValue });

  const someInputIsValid = inputValues.some(
    (value: IInputDataDate) => value.status.isValid && !!value.value.raw
  );

  const noInputIsInvalid = inputValues.every(
    (value: IInputDataDate) => value.status.isValid === true
  );

  const formIsEmpty = inputValues.every(
    (value: IInputDataDate) => !value.value.raw && !value.value.raw.length
  );

  if (someInputIsValid && noInputIsInvalid) {
    return undefined;
  }

  if (formIsEmpty) {
    return ERRORS.FORM.EMPTY as IValidationError;
  }

  return ERRORS.FORM.INVALID as IValidationError;
};

export const validateDateRange = (formValue: ISearchInputForm) => {
  const inputValues = getInputvalues({ ...formValue });

  const isFormFilled = inputValues.every(
    (input: IInputDataDate) =>
      input.status.isValid === true && input.value.raw.length > 0
  );

  if (!isFormFilled) {
    return undefined;
  }

  const { parsedInitialDate, parsedFinalDate } = parseDates(formValue);
  if (!parsedInitialDate || !parsedFinalDate) {
    return undefined;
  }

  const isValidRange =
    isEqual(parsedInitialDate, parsedFinalDate) ||
    isBefore(parsedInitialDate, parsedFinalDate);
  return isFormFilled && isValidRange
    ? undefined
    : (ERRORS.FORM.IMPOSSIBLE_RANGE as IValidationError);
};

export function FormDateValidator(
  formValues: ISearchInputForm,
  validations = [validateAllowSingleInput, validateDateRange]
) {
  const results: IValidationError[] = [];

  validations.forEach((validator) => {
    const result = validator(formValues) as IValidationError;
    if (result) {
      results.push(result);
    }
  });

  return results;
}

export default FormDateValidator;

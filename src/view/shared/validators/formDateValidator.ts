import ERRORS from "../errors";
import { IInputDataDate } from "../interfaces/models/inputDate";
import { ISearchInputForm } from "../interfaces/models/searchInputForm";
import { IValidationError } from "../interfaces/validationError";

const validateAllowSingleInput = (formValue: ISearchInputForm) => {
  const inputValues: IInputDataDate[] = [];

  if (formValue.input.initialDate) {
    inputValues.push(formValue.input.initialDate);
  }

  if (formValue.input.finalDate) {
    inputValues.push(formValue.input.finalDate);
  }

  const someInputIsValid = inputValues.some(
    (value: IInputDataDate) => value.status.isValid
  );

  const noInputIsInvalid = inputValues.every(
    (value: IInputDataDate) => value.status.isValid === true
  );

  return someInputIsValid && noInputIsInvalid
    ? undefined
    : (ERRORS.FORM.INVALID as IValidationError);
};

export function FormDateValidator(
  formValues: ISearchInputForm,
  validations = [validateAllowSingleInput]
) {
  const results: IValidationError[] = [];
  console.log("FormDateValidator:formValues", formValues);

  validations.forEach((validator) => {
    const result = validator(formValues) as IValidationError;
    if (result) {
      results.push(result);
    }
  });

  return results;
}

export default FormDateValidator;

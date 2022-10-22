import { IPropsInput } from "../components/InputDate";
import ddMMyyyyInputMask from "../components/InputDate/constants";

export const DATE_MASK = ddMMyyyyInputMask;
export const fixtureInputProps = {
  id: "001",
  name: "mockedInput",
  label: "mockedLabel",
  placeholder: "mockedPlaceholder",
  onChanged: () => ({}),
  value: "",
  disabled: false,
  minLength: 8,
} as IPropsInput;

export default fixtureInputProps;

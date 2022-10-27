import React from "react";

import { IError } from "../../../../state/models/error";
import { IInputDataDate } from "../../../../state/models/inputDate";
import Text from "../../Text";

import StyledWrapper from "./styles";

export interface IPropsInputErrorFeedback {
  errors: IError[] | undefined;
}

function InputErrorFeedback(props: IPropsInputErrorFeedback) {
  const { errors } = props;

  if (!errors) {
    return null;
  }

  const shouldDisplayInputFeedback = () => {
    const inputHasErrors = !!errors?.length;
    const inputHasFeedback =
      inputHasErrors && errors?.some((e) => !e.avoidFeedback);

    return inputHasFeedback;
  };

  return (
    <>
      {shouldDisplayInputFeedback() && (
        <StyledWrapper>
          {errors
            .filter((e) => !e.avoidFeedback)
            .map((e) => (
              <Text key={e.code}>{e.message}</Text>
            ))}
        </StyledWrapper>
      )}
    </>
  );
}

export default InputErrorFeedback;

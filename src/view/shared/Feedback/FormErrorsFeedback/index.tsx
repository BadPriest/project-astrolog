import React from "react";

import { IError } from "../../../../state/models/error";
import Text from "../../Text";

import StyledWrapper from "./styles";

export interface IPropsFormErrorsFeedback {
  errors: IError[] | undefined;
}

function FormErrorsFeedback(props: IPropsFormErrorsFeedback) {
  const { errors } = props;

  if (!errors) {
    return null;
  }

  const shouldDisplayInputFeedback = () => {
    const hasErrors = !!errors?.length;
    const hasFeedback = hasErrors && errors?.some((e) => !e.avoidFeedback);

    return hasFeedback;
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

export default FormErrorsFeedback;

import React from "react";
import StyledWrapper, { StyledText } from "./styles";

export interface IPropsFeedbackDataLoading {
  title?: string;
}

function FeedbackDataLoading({ title = "loading" }: IPropsFeedbackDataLoading) {
  return (
    <StyledWrapper>
      <StyledText>{title}</StyledText>
    </StyledWrapper>
  );
}

export default FeedbackDataLoading;

import React from "react";

import {
  StyledHeaderWrapper,
  StyledHeaderTitle,
  StyledHeaderInfo,
} from "./styles";

function Header() {
  return (
    <StyledHeaderWrapper>
      <StyledHeaderTitle>NewThings/assignment</StyledHeaderTitle>
      <StyledHeaderInfo>Bruno Vergatti</StyledHeaderInfo>
    </StyledHeaderWrapper>
  );
}

export default Header;

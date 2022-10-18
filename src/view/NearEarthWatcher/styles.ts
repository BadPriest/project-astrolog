import styled from "styled-components";

export const StyledTitle = styled.h1`
  font-family: ${(props) => props.theme.typography.special.fontFamily};
  font-size: ${(props) => props.theme.typography.headings.h2.fontSize};
`;

export default StyledTitle;

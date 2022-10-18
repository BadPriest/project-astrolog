import styled from "styled-components";

export const Title = styled.h3`
  font-family: ${(props) => props.theme.typography.special.fontFamily};
  font-size: ${(props) => props.theme.typography.headings.h3.fontSize};
`;

export default Title;

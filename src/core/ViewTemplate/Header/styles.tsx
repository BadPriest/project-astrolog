import styled from "styled-components";
import Text from "../../../view/shared/components/Text";

export const StyledHeaderWrapper = styled.header`
  margin-top: 1.5rem;
  background-color: ${(props) =>
    props.theme.colors.interactiveElements.surfaceActive};

  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "title info";
`;

export const StyledHeaderTitle = styled.h2`
  color: ${(props) => props.theme.colors.interactiveElements.textActive};
  font-family: ${(props) => props.theme.typography.special.fontFamily};
  font-weight: ${(props) => props.theme.typography.headings.fontWeight};

  font-size: 2.5rem;
  margin: 0.3rem 0.5em;
`;

export const StyledHeaderInfo = styled(Text)`
  color: ${(props) => props.theme.colors.interactiveElements.textActive};
  font-family: ${(props) => props.theme.typography.special.fontFamily};
  font-weight: ${(props) => props.theme.typography.headings.fontWeight};

  margin: 1.1rem;
  margin-left: auto;
`;

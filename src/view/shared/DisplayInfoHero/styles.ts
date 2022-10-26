import styled, { css } from "styled-components";
import { Text } from "../Text";

export const StyledWrapper = styled.div<{
  inline?: boolean;
  small?: boolean;
}>`
  margin: 0.2em 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: ${({ inline }) => (inline ? "row" : "column")};
  justify-content: start;

  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.headings.fontFamily};
  font-size: ${({ theme }) => theme.typography.headings.h2.fontSize};

  ${({ inline }) => css`
    ${inline &&
    css`
      & > *:nth-child(1n) {
        margin-right: 0.4rem;
      }
    `}
  `}

  ${({ small }) => css`
    ${small &&
    css`
      font-size: ${({ theme }) => theme.typography.headings.h4.fontSize};
    `}
  `}
`;

export const StyledLabel = styled(Text)`
  margin: 0;
  text-transform: capitalize;

  opacity: 0.6;
  font-weight: inherit;
  font-family: inherit;
  font-size: 75%;
`;

export const StyledValue = styled(Text)`
  margin: 0;
  min-height: 1.2em;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: inherit;
  font-family: inherit;
  font-size: 100%;
`;

export default StyledWrapper;

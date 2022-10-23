import { css } from "styled-components";

export const BaseInputCSS = css`
  display: block;

  font-family: ${(props) => props.theme.typography.special.fontFamily};
  font-size: ${(props) => props.theme.typography.headings.h3.fontSize};
  padding: 0.5em 0.2em;

  outline: none;
  border: none;

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.interactive.surface};
  transition: 0.2s ease-in;

  &:focus {
    color: ${({ theme }) => theme.colors.interactive.textActive};
    background-color: ${({ theme }) => theme.colors.interactive.surfaceActive};
    transition: 0.2s ease-in;

    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.muted.text};
    background-color: ${({ theme }) => `${theme.colors.muted.surface}`};
  }

  &::placeholder {
    @media screen and (max-width: 40em) {
      font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
    }

    @media screen and (min-width: 200em) {
      font-size: ${({ theme }) => theme.typography.body.small.fontSize};
    }
  }
`;

export default BaseInputCSS;

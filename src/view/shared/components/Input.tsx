import styled from "styled-components";

export const BaseInput = styled.input`
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
    background-color: ${({ theme }) =>
      theme.colors.interactive.surfaceActive};
    transition: 0.2s ease-in;

    outline: none;
  }
`;

export default BaseInput;

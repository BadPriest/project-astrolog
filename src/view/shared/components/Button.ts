import styled from "styled-components";

const ResetButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;
  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
`;

export const Button = styled(ResetButton)`
  font-family: ${(props) => props.theme.typography.special.fontFamily};
  font-weight: bold;
  font-size: 0.9rem;

  cursor: pointer;

  text-transform: uppercase;
  padding: 1.2em 2em;

  color: ${({ theme }) => theme.colors.interactive.text};
  background-color: ${({ theme }) => theme.colors.interactive.surface};

  &:hover {
    color: ${({ theme }) => theme.colors.interactive.textActive};
    background-color: ${({ theme }) =>
      theme.colors.interactive.surfaceActive};
  }
`;

export const ButtonText = styled.span`
  display: block;
  position: relative;
  background-color: ${({ theme }) => theme.colors.interactive.surface};
  z-index: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.interactive.textActive};
    background-color: ${({ theme }) =>
      theme.colors.interactive.surfaceActive};
  }
`;

export default ResetButton;

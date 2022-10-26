import styled, { css } from "styled-components";

export interface IPropsText {
  small?: boolean;
  large?: boolean;
}

export const Text = styled.p`
  color: inherit;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-weight: ${({ theme }) => theme.typography.headings.fontWeight};
  font-size: ${({ theme }) => theme.typography.body.regular.fontSize};

  ${({ small, large }: IPropsText) => css`
    ${small &&
    css`
      font-size: ${({ theme }) => theme.typography.body.small.fontSize};
    `}

    ${large &&
    css`
      font-size: ${({ theme }) => theme.typography.body.large.fontSize};
    `}
  `}
`;

export default Text;

import styled from "styled-components";

export const StyledWrapper = styled.article`
  padding: 0.4rem;

  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.interactive.textActive};
`;

export default StyledWrapper;

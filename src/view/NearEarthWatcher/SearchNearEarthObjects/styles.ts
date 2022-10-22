import styled from "styled-components";

export const StyledSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
`;

export const StyledWrapperFormErrors = styled.div`
  margin-top: 1rem;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.interactive.textActive};
  font-weight: bold;
`;

export default StyledSearchForm;

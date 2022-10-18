import styled from "styled-components";

export const StyledSearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
`;

export const StyledWrapperInput = styled.div`
  display: flex;
  flex-direction: column;

  & > label {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

export const StyledWrapperMetadata = styled.aside`
  display: flex;
  justify-content: center;
  align-items: end;
`;

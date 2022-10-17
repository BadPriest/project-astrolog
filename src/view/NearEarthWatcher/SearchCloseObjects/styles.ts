import styled from "styled-components";

export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 2rem;
`;

export const WrapperInput = styled.div`
  display: flex;
  flex-direction: column;

  & > label {
    display: block;
    margin-bottom: 0.5rem;
  }
`;

export const WrapperMetadata = styled.aside`
  display: flex;
  justify-content: center;
  align-items: end;
`;

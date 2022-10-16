import styled from "styled-components";

export const WrapperSearchControls = styled.div`
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

export const WrapperResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;
`;

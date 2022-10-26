import MaskedInput from "react-text-mask";
import styled from "styled-components";
import BaseInputCSS from "../Input";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledMaskedInputDate = styled(MaskedInput)`
  ${BaseInputCSS}
`;

export const StyledWrapperError = styled.div`
  margin-top: 1rem;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.interactive.textActive};
  font-weight: bold;
`;

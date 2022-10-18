import styled from "styled-components";
import BaseInput from "../Input";

export const StyledInputDate = styled(BaseInput)`
  &::placeholder {
    @media screen and (max-width: 40em) {
      font-size: ${({ theme }) => theme.typography.body.regular.fontSize};
    }

    @media screen and (min-width: 200em) {
      font-size: ${({ theme }) => theme.typography.body.small.fontSize};
    }
  }
`;

export default StyledInputDate;

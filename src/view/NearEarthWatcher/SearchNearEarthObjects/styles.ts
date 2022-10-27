import styled from "styled-components";
import { Button } from "../../shared/Button";

export const StyledSearchForm = styled.form`
  display: grid;
  gap: 1rem;
  margin: 0 5rem;
  grid-template-columns: 1fr 1fr 0.2fr 1fr;
  grid-template-areas:
    "initialDate finalDate . submit"
    "initialDateFeedback finalDateFeedback . ."
    "formFeedback formFeedback . . ";
`;

export const StyledWrapperInitialDate = styled.div`
  grid-area: initialDate;
`;
export const StyledWrapperFinalDate = styled.div`
  grid-area: finalDate;
`;

export const StyledWrapperInitialDateFeedback = styled.div`
  grid-area: initialDateFeedback;
`;
export const StyledWrapperFinalDateFeedback = styled.div`
  grid-area: finalDateFeedback;
`;
export const StyledWrapperFormFeedback = styled.div`
  grid-area: formFeedback;
`;

export const StyledButton = styled(Button)`
  grid-area: submit;
  align-self: end;
`;

export default StyledSearchForm;

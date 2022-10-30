import styled from "styled-components";

export const StyledWrapper = styled.div`
  padding: 0.005rem 1rem;

  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.text};
`;

export const StyledFeedbackHeader = styled.header`
  display: flex;
  padding: 0.2rem 0.5rem;

  & > p:last-child {
    margin-left: auto;
    padding-right: 1rem;
  }
`;

export default StyledWrapper;

import styled from "styled-components";
import Text from "../../../shared/Text";

export const StyledWrapper = styled.div`
  padding: 1rem;

  color: ${({ theme }) => theme.colors.danger};
  border: 2px solid ${({ theme }) => theme.colors.danger};
`;

export const StyledFeedbackHeader = styled.header`
  display: flex;

  padding: 0.2rem 0.5rem;
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  & > p:last-child {
    margin-left: auto;
    padding-right: 1rem;
  }
`;

export const StyledErrorBody = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.danger};
  padding: 0.2rem 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

export const StyledErrorList = styled.div`
  max-height: 22rem;

  overflow-y: auto;
  overflow-x: hidden;
`;

export const StyledErrorEntry = styled(Text)`
  transition: ${({ theme }) =>
    `${theme.animations.surface.activationTransition} ease-in`};

  padding: 0.6rem;
  margin: 0;

  & > strong {
    font-family: ${(props) => props.theme.typography.special.fontFamily};
  }

  &:hover {
    transition: ${(props) =>
        props.theme.animations.surface.activationTransition}
      ease-out;

    transform: scale(1.01);
    margin-left: 0.2rem;
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export default StyledWrapper;

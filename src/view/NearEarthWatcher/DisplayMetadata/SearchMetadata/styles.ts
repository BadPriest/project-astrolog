import styled from 'styled-components';

export const StyledWrapper = styled.div`
  transition: ${({ theme }) =>
    `${theme.animations.surface.activationTransition} ease-in`};

  padding: 0.005rem 1rem;

  color: ${({ theme }) => theme.colors.interactive.text};
  border: 2px solid ${({ theme }) => theme.colors.interactive.text};

  &:hover {
    transition: ${(props) =>
        props.theme.animations.surface.activationTransition}
      ease-out;

    transform: scale(1.01);

    background: ${({ theme }) => theme.colors.interactive.surfaceActive};
    color: ${({ theme }) => theme.colors.interactive.textActive};
    outline: 2px solid ${({ theme }) => theme.colors.interactive.textActive};
  }
`;

export const StyledFeedbackHeader = styled.header`
  display: flex;
  padding: 0.2rem 0.5rem;

  & > p:first-child {
    margin-right: auto;
  }

  & strong {
    font-family: ${({ theme }) => theme.typography.special.fontFamily};
  }
`;

export default StyledWrapper;

import styled from "styled-components";

export const StyledWrapperResults = styled.div`
  padding: 0 4em;
`;

export const StyledDayCategory = styled.div``;

export const StyledDayLabel = styled.h3`
  position: relative;
  z-index: 300;

  &::before {
    content: " ";
    display: block;
    position: absolute;
    background-color: ${(props) => props.theme.colors.background};

    height: 0.8rem;
    width: 10rem;

    top: 25%;
    left: -16px;
    z-index: -1;
  }

  &::after {
    content: " ";
    display: block;
    position: absolute;
    background-color: ${(props) => props.theme.colors.accent};
    height: 0.8rem;
    width: 100vw;

    /* margin-top: -1.5%; */
    top: 25%;
    left: -3%;
    z-index: -2;
  }
`;

export const StyledEntry = styled.article`
  margin: 0.4rem;
  padding: 1rem;
  background-color: ${(props) =>
    props.theme.colors.interactiveElements.surface};

  transition: 0.2s ease-in;

  &:hover {
    transform: scale(1.01);
    color: ${(props) => props.theme.colors.interactiveElements.textActive};
    background-color: ${(props) =>
      props.theme.colors.interactiveElements.surfaceActive};
    transition: ${(props) =>
        props.theme.animations.surface.activationTransition}
      ease-out;
  }
`;

export default StyledWrapperResults;

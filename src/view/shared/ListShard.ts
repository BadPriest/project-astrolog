import styled from "styled-components";

const Reset = styled.article`
  margin: 0;
  padding: 0;

  line-height: normal;
`;

export const ListShard = styled(Reset)`
  transition: ${({ theme }) =>
    `${theme.animations.surface.activationTransition} ease-in`};

  margin: 0.4rem 0;
  padding: 0 1rem;
  position: relative;
  overflow: hidden;

  background-color: ${(props) => props.theme.colors.interactive.surface};

  &:hover {
    transition: ${(props) =>
        props.theme.animations.surface.activationTransition}
      ease-out;

    transform: scale(1.01);

    color: ${(props) => props.theme.colors.interactive.textActive};
    background-color: ${(props) =>
      props.theme.colors.interactive.surfaceActive};
  }
`;
export default ListShard;

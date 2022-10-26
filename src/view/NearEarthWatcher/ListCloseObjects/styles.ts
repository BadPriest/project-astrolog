import styled from "styled-components";

export const StyledWrapperResults = styled.div`
  padding: 0 5rem;
`;

export const StyledDayCategory = styled.div``;

export const StyledDayLabel = styled.h3`
  display: block;
  position: relative;
  padding-left: 1.8rem;

  font-family: ${({ theme }) => theme.typography.special.fontFamily};
  font-size: ${({ theme }) => theme.typography.headings.h3.fontSize};

  z-index: 0;

  &::before {
    content: " ";
    display: block;
    position: absolute;
    background-color: ${(props) => props.theme.colors.background};

    height: 0.8rem;
    width: 10.5rem;

    top: 25%;
    left: 0.5rem;
    z-index: -1;
  }

  &::after {
    content: " ";
    display: block;
    position: absolute;
    background-color: ${(props) => props.theme.colors.accent};
    height: 0.8rem;
    width: calc(100% + 4rem);

    overflow: hidden;

    top: 25%;
    left: -3%;
    z-index: -2;
  }
`;

export default StyledWrapperResults;

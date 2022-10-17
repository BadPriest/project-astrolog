import styled from "styled-components";

export const WrapperResults = styled.div`
  padding: 0 4em;
`;

export const DayCategory = styled.div``;

export const DayLabel = styled.h3`
  position: relative;
  z-index: 300;

  &::before {
    content: " ";
    display: block;
    position: absolute;
    background-color: #222;

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
    background-color: #ee3928;

    height: 0.8rem;
    width: 100vw;

    /* margin-top: -1.5%; */
    top: 25%;
    left: -3%;
    z-index: -2;
  }
`;

export const Entry = styled.article`
  margin: 0.4rem;
  padding: 1rem;
  background-color: #555;
  transition: 0.2s ease-in;

  &:hover {
    background-color: #aaa;
    transition: 0.2s ease-out;
    transform: scale(1.01);
  }
`;

export default WrapperResults;

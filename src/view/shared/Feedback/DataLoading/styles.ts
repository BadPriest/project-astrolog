import styled from "styled-components";

import getColoredFlickerLoading from "../../utils/animation.getColorFlicker";

import Text from "../../Text";

export const StyledText = styled(Text)`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  font-family: ${({ theme }) => theme.typography.special.fontFamily};
  font-size: ${({ theme }) => theme.typography.headings.h3.fontSize};
`;

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100%;
  font-size: ${({ theme }) => theme.typography.headings.h3.fontSize};

  & > ${StyledText} {
    opacity: 0.6;
    margin-left: auto;
  }

  &::after {
    content: " ";
    width: 0.5em;
    aspect-ratio: 0.7;
    background-color: ${({ theme }) => theme.colors.text};
    margin-left: 0.2em;
    animation: 800ms ${(props) => getColoredFlickerLoading(props)} ease-out
      infinite;
  }
`;

export default StyledWrapper;

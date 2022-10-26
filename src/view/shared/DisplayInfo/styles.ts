import styled from "styled-components";
import { Text } from "../Text";

export const StyledWrapper = styled.div<{ inline?: boolean }>`
  display: flex;
  flex-direction: ${({ inline }) => (inline ? "row" : "column")};

  gap: 0.2em;
  margin: 0.8em 0;
`;

export const StyledLabel = styled(Text)`
  margin: 0;
  text-transform: capitalize;

  opacity: 0.6;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const StyledValue = styled(Text)`
  margin: 0;
  min-height: 1.2em;

  color: inherit;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default StyledWrapper;

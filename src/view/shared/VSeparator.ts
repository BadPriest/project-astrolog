import styled from "styled-components";

const DEFAULT_SEPARATION = "1rem";

export interface IVSeparatorProps {
  height?: string;
}

export const VSeparator = styled.div`
  height: 0.1px;
  margin: ${(props: IVSeparatorProps) =>
    `${props.height || DEFAULT_SEPARATION} 0;`};
`;

export default VSeparator;

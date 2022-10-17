import styled from "styled-components";

const DEFAULT_SEPARATION = "1rem";

export interface IPropsVSeparator {
  height?: string;
}

export const VSeparator = styled.div`
  height: 0.1px;
  margin: ${(props: IPropsVSeparator) =>
    `${props.height || DEFAULT_SEPARATION} 0;`};
`;

export default VSeparator;

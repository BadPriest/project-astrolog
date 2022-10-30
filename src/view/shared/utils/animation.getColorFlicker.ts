import { keyframes } from "styled-components";

export const getColoredFlickerLoading = ({ theme }: any) => keyframes`
  // ? Made with function bcs the theming wasn't accessible straight through on styled.keyframes
  // ? see https://stackoverflow.com/questions/59952573/styled-components-pass-props-theme-to-keyframes#59952676
  0%   { 
    background-color: ${theme.colors.success};
    opacity:0.6; 
  }

  100%  { opacity:0; }
`;

export default getColoredFlickerLoading;

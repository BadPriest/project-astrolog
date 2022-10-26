import React from "react";
import { IPropsDisplayInfo } from "../DisplayInfo";
import StyledWrapper, { StyledLabel, StyledValue } from "./styles";

export interface IPropsDisplayInfoHero extends IPropsDisplayInfo {
  small?: boolean;
}

function DisplayInfoHero(props: IPropsDisplayInfoHero) {
  const { label, value = "--", inline = false, small = false } = props;
  return (
    <StyledWrapper small={small} inline={inline}>
      <StyledLabel small>{label}</StyledLabel>
      <StyledValue title={value}>{value}</StyledValue>
    </StyledWrapper>
  );
}

export default DisplayInfoHero;

import React from "react";
import StyledWrapper, { StyledLabel, StyledValue } from "./styles";

export interface IPropsDisplayInfo {
  label: string;
  value?: string;
  inline?: boolean;
}

function DisplayInfo(props: IPropsDisplayInfo) {
  const { label, value = "--", inline = false } = props;
  return (
    <StyledWrapper inline={inline}>
      <StyledLabel small>{label}</StyledLabel>
      <StyledValue title={value}>{value}</StyledValue>
    </StyledWrapper>
  );
}

export default DisplayInfo;

import React from "react";
import Text from "../../shared/components/Text";
import { ISearchMetadata } from "../dataNormalizers/normalizeSearchMetadata";
import { StyledWrapper } from "./styles";

export interface IPropsDisplayMetadata {
  data: ISearchMetadata;
}

function DisplayMetadata(props: IPropsDisplayMetadata) {
  const { data } = props;
  return (
    <StyledWrapper>
      <Text>
        Found {data?.nearObjectsCount} entries for the given period: {"  "}[
        {`${data?.originalQueryDateRange.initialDate} ~ ${data?.originalQueryDateRange.finalDate}`}
        ]{" "}
      </Text>
    </StyledWrapper>
  );
}

export default DisplayMetadata;

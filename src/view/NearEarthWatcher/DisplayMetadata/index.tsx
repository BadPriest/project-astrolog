import React from "react";
import { ISearchMetadata } from "../../../state/models/searchMetadata";
import Text from "../../shared/Text";

import { StyledWrapper } from "./styles";

export interface IPropsDisplayMetadata {
  data: ISearchMetadata | undefined;
}

function DisplayMetadata(props: IPropsDisplayMetadata) {
  const { data } = props;

  if (!data) {
    return null;
  }

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

import { differenceInCalendarDays } from "date-fns";
import React from "react";
import { ISearchMetadata } from "../../../../state/models/searchMetadata";
import { parseDate } from "../../../../utils/parseDates";
import Text from "../../../shared/Text";

import { StyledFeedbackHeader, StyledWrapper } from "./styles";

export interface IPropsSearchMetadata {
  data: ISearchMetadata | undefined;
}

function SearchMetadata(props: IPropsSearchMetadata) {
  const { data } = props;

  if (!data) {
    return null;
  }

  const parsedInitialDate = parseDate(
    data?.originalQueryDateRange.initialDate as string
  );
  const parsedFinalDate = parseDate(
    data?.originalQueryDateRange.finalDate as string
  );

  const diffInDays = differenceInCalendarDays(
    parsedFinalDate,
    parsedInitialDate
  );

  const ticketCount = (diffInDays / 7 - 1).toFixed(0);

  return (
    <StyledWrapper>
      <StyledFeedbackHeader>
        <Text>
          Found {data?.nearObjectsCount} entries for the given period: {"  "}[
          {`${data?.originalQueryDateRange.initialDate} ~ ${data?.originalQueryDateRange.finalDate}`}
          ]
        </Text>
        <Text>[API Tickets used: {ticketCount}]</Text>
      </StyledFeedbackHeader>
    </StyledWrapper>
  );
}

export default SearchMetadata;

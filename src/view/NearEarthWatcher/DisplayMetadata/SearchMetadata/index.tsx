import React from 'react';
import { differenceInCalendarDays } from 'date-fns';

import { ISearchMetadata } from '../../../../state/models/searchMetadata';
import { parseDate } from '../../../../utils/parseDates';
import Text from '../../../shared/Text';

import { StyledFeedbackHeader, StyledWrapper } from './styles';

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

  const ticketCount = diffInDays > 7 ? Math.ceil(diffInDays / 7) : 1;

  return (
    <StyledWrapper>
      <StyledFeedbackHeader>
        <Text>
          Found <strong>{data?.nearObjectsCount || 0}</strong> entries for the
          given period: {'  '}[
          <strong>
            {`${data?.originalQueryDateRange.initialDate} ~ ${data?.originalQueryDateRange.finalDate}`}
          </strong>
          ]
        </Text>
        {!!data?.nearObjectsCount && (
          <Text>
            [API Tickets used: <strong>{ticketCount}</strong>]
          </Text>
        )}
      </StyledFeedbackHeader>
    </StyledWrapper>
  );
}

export default SearchMetadata;

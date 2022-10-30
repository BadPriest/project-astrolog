import React, { Fragment } from "react";
import { FailedDataPackage } from "../../../../services/fetchNeoData";
import Text from "../../../shared/Text";

import {
  StyledErrorBody,
  StyledErrorEntry,
  StyledFeedbackHeader,
  StyledErrorList,
  StyledWrapper,
} from "./styles";

export interface IPropsErrorMetadata {
  data: FailedDataPackage | undefined;
}

function ErrorMetadata(props: IPropsErrorMetadata) {
  const { data } = props;

  if (!data || !Object.keys(data).length) {
    return null;
  }

  return (
    <StyledWrapper>
      <Text large>[!] Warning: some errors occurred. </Text>
      <>
        {Object.keys(data).map((key) => {
          const entry = data[key];
          return (
            <Fragment key={key}>
              <StyledFeedbackHeader>
                <Text>{entry.error.message}</Text>
                <Text>Count: {entry.failedQueries.length}</Text>
              </StyledFeedbackHeader>
              <StyledErrorBody>
                <Text>The following query dates have not concluded:</Text>
                <StyledErrorList>
                  {entry.failedQueries.map((query) => (
                    <StyledErrorEntry key={query.startDate}>
                      From <strong>{query.startDate}</strong> to{" "}
                      <strong>{query.endDate}</strong>
                    </StyledErrorEntry>
                  ))}
                </StyledErrorList>
              </StyledErrorBody>
            </Fragment>
          );
        })}
      </>
    </StyledWrapper>
  );
}

export default ErrorMetadata;

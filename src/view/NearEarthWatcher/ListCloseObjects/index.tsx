import React from "react";
import { INearEarthObject } from "../../shared/interfaces/models/nearEarthObject";
import { MappedDataAlias } from "../dataNormalizers/normalizeNearEarthObjects";
import StyledWrapperResults, { StyledDayCategory, StyledDayLabel, StyledEntry } from "./styles";

export interface IPropsListCloseObjects {
  dataSet: MappedDataAlias | undefined;
}

function ListCloseObjects(props: IPropsListCloseObjects) {
  const { dataSet } = props;

  const renderList = () => {
    if (!dataSet) {
      return null;
    }

    return Object.keys(dataSet).map((key) => {
      const entries: INearEarthObject[] = dataSet[key];

      return (
        <StyledDayCategory key={key}>
          <StyledDayLabel>{key}</StyledDayLabel>
          {entries.map((e: INearEarthObject) => (
            <StyledEntry key={e.id}>
              {`
                ${e.name}, 
                absoluteMagnitudeH: ${e.absoluteMagnitudeH}
                ${
                  e.isPotentiallyHazardousAsteroid
                    ? ", Potentially Hazardous, "
                    : ""
                }
                ${e.isSentryObject ? ", Sentry Object" : ""},
                estimatedDiameter (KM): 
                min: ${e.estimatedDiameter.kilometers.estimatedDiameterMin}
                max: ${e.estimatedDiameter.kilometers.estimatedDiameterMax}
              `}
            </StyledEntry>
          ))}
        </StyledDayCategory>
      );
    });
  };

  return <StyledWrapperResults>{renderList()}</StyledWrapperResults>;
}

export default ListCloseObjects;

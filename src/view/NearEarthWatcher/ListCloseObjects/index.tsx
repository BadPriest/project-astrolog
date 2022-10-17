import React from "react";
import { INearEarthObject } from "../../shared/interfaces/models/nearEarthObject";
import { MappedDataAlias } from "../dataNormalizers/normalizeNearEarthObjects";
import WrapperResults, { DayCategory, DayLabel, Entry } from "./styles";

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
        <DayCategory key={key}>
          <DayLabel>{key}</DayLabel>
          {entries.map((e: INearEarthObject) => (
            <Entry key={e.id}>
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
            </Entry>
          ))}
        </DayCategory>
      );
    });
  };

  return <WrapperResults>{renderList()}</WrapperResults>;
}

export default ListCloseObjects;

import React from "react";

import { INearEarthObject } from "../../../state/models/nearEarthObject";
import { MappedDataAlias } from "../../../state/models/mappedDataAlias";

import Text from "../../shared/Text";
import ListShard from "../../shared/ListShard";

import { parseDateForDisplay } from "../../../utils/parseDates";

import StyledWrapperResults, {
  StyledDayCategory,
  StyledDayLabel,
} from "./styles";

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
          <StyledDayLabel>{parseDateForDisplay(key)}</StyledDayLabel>
          {entries.map((e: INearEarthObject) => (
            <ListShard key={e.id}>
              <Text>
                Name: {e.name}
                {e.isPotentiallyHazardousAsteroid &&
                  ", [Potentially Hazardous]"}
                {e.isSentryObject && " [Sentry Object]"}
              </Text>
              <Text>
                Estimated Diameter (KM) - min:{" "}
                {e.estimatedDiameter.kilometers.estimatedDiameterMin}, max:{" "}
                {e.estimatedDiameter.kilometers.estimatedDiameterMax}S
              </Text>
            </ListShard>
          ))}
        </StyledDayCategory>
      );
    });
  };

  return <StyledWrapperResults>{renderList()}</StyledWrapperResults>;
}

export default ListCloseObjects;

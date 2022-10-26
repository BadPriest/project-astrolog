import React from "react";

import { INearEarthObject } from "../../../state/models/nearEarthObject";
import { MappedDataAlias } from "../../../state/models/mappedDataAlias";

import Text from "../../shared/Text";
import ListShard from "../../shared/ListShard";

import { parseDateForDisplay } from "../../../utils/parseDates";

import StyledWrapperResults, {
  StyledDayCategory,
  StyledDayLabel,
  StyledInfoCol,
  StyledInfoRow,
  StyledSectionHeader,
  StyledWrapperHeaderInfo,
} from "./styles";
import DisplayInfo from "../../shared/DisplayInfo";
import DisplayInfoHero from "../../shared/DisplayInfoHero";
import VSeparator from "../../shared/VSeparator";

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
              <StyledWrapperHeaderInfo>
                <DisplayInfoHero label="Name" value={e.name} />
                {e.isSentryObject && <Text>[Sentry Object]</Text>}
                {e.isPotentiallyHazardousAsteroid && (
                  <Text>[Potentially Hazardous]</Text>
                )}
              </StyledWrapperHeaderInfo>
              <VSeparator height="0.5rem" />
              <StyledInfoRow>
                <StyledInfoCol>
                  <StyledSectionHeader>
                    Latest close approach data
                  </StyledSectionHeader>
                  <StyledInfoRow>
                    <DisplayInfo
                      label="Orbiting body"
                      value={e.closeApproachData[0].orbitingBody}
                    />
                    <DisplayInfo
                      label="Date"
                      value={parseDateForDisplay(e.closeApproachData[0].date)}
                    />
                    <DisplayInfo
                      label="Miss distance (AU)"
                      value={e.closeApproachData[0].missDistance.astronomical}
                    />
                    <DisplayInfo
                      label="Relative velocity (KM/h)"
                      value={e.closeApproachData[0].relativeVelocity.kmPerHour}
                    />
                  </StyledInfoRow>
                </StyledInfoCol>
                <StyledInfoCol>
                  <StyledSectionHeader>
                    Diameter estimates (KM)
                  </StyledSectionHeader>
                  <StyledInfoRow>
                    <DisplayInfo
                      label="Minimum"
                      value={e.estimatedDiameter.kilometers.estimatedDiameterMin.toString()}
                    />
                    <DisplayInfo
                      label="Maximum"
                      value={e.estimatedDiameter.kilometers.estimatedDiameterMax.toString()}
                    />
                  </StyledInfoRow>
                </StyledInfoCol>
              </StyledInfoRow>
            </ListShard>
          ))}
        </StyledDayCategory>
      );
    });
  };

  return <StyledWrapperResults>{renderList()}</StyledWrapperResults>;
}

export default ListCloseObjects;

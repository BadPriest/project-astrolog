import React, { useState } from "react";
import { INearEarthObject } from "../shared/interfaces/models/nearEarthObject";

import VSeparator from "../shared/components/VSeparator";
import SearchCloseObjects from "./SearchCloseObjects";

import { MappedDataAlias } from "./SearchCloseObjects/normalizeNearEarthObjects";

import { WrapperResults } from "./styles";

function NearEarthWatcher() {
  const [searchResults, setSearchResults] = useState<MappedDataAlias>();

  const renderList = () => {
    if (!searchResults) {
      return null;
    }

    return Object.keys(searchResults as MappedDataAlias).map((key) => {
      const entries: INearEarthObject[] = searchResults[key];

      return (
        <div key={key}>
          <h3>{key}</h3>
          {entries.map((e: INearEarthObject) => (
            <p key={e.id}>
              {`${e.name}, 
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
            </p>
          ))}
        </div>
      );
    });
  };

  return (
    <>
      <h2>Near Earth Watcher</h2>
      <VSeparator height=".5rem" />
      <SearchCloseObjects setResults={setSearchResults} />
      <VSeparator />
      <WrapperResults>{renderList()}</WrapperResults>
    </>
  );
}

export default NearEarthWatcher;

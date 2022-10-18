import {
  IResponseNEO,
  IResponseSearchFeed,
} from "../../shared/interfaces/apiResponses/neoWsFeed";
import { INearEarthObject } from "../../shared/interfaces/models/nearEarthObject";

export type MappedDataAlias = { [key: string]: INearEarthObject[] };

const normalizeDataItem = (rawData: unknown): INearEarthObject => {
  const data = rawData as IResponseNEO;
  const closeApproachData = data.close_approach_data;

  const normalizedItem: INearEarthObject = {
    id: data.id,
    neoReferenceId: data.neo_reference_id,
    name: data.name,
    absoluteMagnitudeH: data.absolute_magnitude_h,
    isPotentiallyHazardousAsteroid: data.is_potentially_hazardous_asteroid,
    isSentryObject: data.is_sentry_object,
    links: {
      self: data.links.self,
    },
    nasaJPLUrl: data.nasa_jpl_url,
    estimatedDiameter: {
      feet: {
        estimatedDiameterMax:
          data.estimated_diameter.feet.estimated_diameter_max,
        estimatedDiameterMin:
          data.estimated_diameter.feet.estimated_diameter_min,
      },
      kilometers: {
        estimatedDiameterMax:
          data.estimated_diameter.kilometers.estimated_diameter_max,
        estimatedDiameterMin:
          data.estimated_diameter.kilometers.estimated_diameter_min,
      },
      meters: {
        estimatedDiameterMax:
          data.estimated_diameter.meters.estimated_diameter_max,
        estimatedDiameterMin:
          data.estimated_diameter.meters.estimated_diameter_min,
      },
      miles: {
        estimatedDiameterMax:
          data.estimated_diameter.miles.estimated_diameter_max,
        estimatedDiameterMin:
          data.estimated_diameter.miles.estimated_diameter_min,
      },
    },
    closeApproachData: closeApproachData.map((e) => ({
      date: e.close_approach_date,
      dateFull: e.close_approach_date_full,
      dateEpoch: e.epoch_date_close_approach,
      orbitingBody: e.orbiting_body,
      relativeVelocity: {
        kmPerSecond: e.relative_velocity?.kilometers_per_second,
        kmPerHour: e.relative_velocity?.kilometers_per_hour,
        milesPerHour: e.relative_velocity?.miles_per_hour,
      },
      missDistance: {
        astronomical: e.miss_distance?.astronomical,
        lunar: e.miss_distance?.lunar,
        kilometers: e.miss_distance?.kilometers,
        miles: e.miss_distance?.miles,
      },
    })),
  };

  return normalizedItem;
};

export const normalizeDataSet = (rawData: unknown): MappedDataAlias => {
  const data = (rawData as IResponseSearchFeed).near_earth_objects;

  if (!data) {
    throw new Error(
      `[exception, DATA] rawData response is not in expected shape.
       Actual: ${JSON.stringify(rawData)}`
    );
  }

  const normalizedDataSet = {} as MappedDataAlias;

  Object.keys(data).forEach((key) => {
    const entries = data[key] as Array<IResponseNEO>;

    const normalizedEntries = entries.map(normalizeDataItem);
    normalizedDataSet[key] = normalizedEntries;
  });

  return normalizedDataSet;
};

export default normalizeDataSet;

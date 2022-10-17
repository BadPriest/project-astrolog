/* eslint-disable no-use-before-define */
export interface INearEarthObject {
  id: string;
  neoReferenceId: string;
  name: string;
  absoluteMagnitudeH: number;
  isPotentiallyHazardousAsteroid: boolean;
  isSentryObject: boolean;

  closeApproachData: ICloseApproachData[];
  estimatedDiameter: IEstimatedDiameters;

  links: IObjectLinks;
  nasaJPLUrl: URL;
}

interface ICloseApproachData {
  date: string;
  dateFull: string;
  dateEpoch: number;
  orbitingBody: string;
  missDistance: IMissDistance;
  relativeVelocity: IRelativeVelocity;
}

interface IMissDistance {
  astronomical: string;
  kilometers: string;
  lunar: string;
  miles: string;
}

interface IRelativeVelocity {
  kmPerHour: string;
  kmPerSecond: string;
  milesPerHour: string;
}

interface IEstimatedDiameters {
  feet: IEstimatedDiameterInterval;
  kilometers: IEstimatedDiameterInterval;
  meters: IEstimatedDiameterInterval;
  miles: IEstimatedDiameterInterval;
}

interface IEstimatedDiameterInterval {
  estimatedDiameterMax: number;
  estimatedDiameterMin: number;
}

interface IObjectLinks {
  self?: URL;
  next?: URL;
  previous?: URL;
}

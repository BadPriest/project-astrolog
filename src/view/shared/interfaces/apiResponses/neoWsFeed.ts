/** This one doesn't seem to belong here. */
export interface IResponseSearchFeed {
  links: any;
  element_count: any;
  near_earth_objects: any;
}

export interface IResponseNEO {
  id: any;
  neo_reference_id: any;
  name: any;
  absolute_magnitude_h: any;
  is_potentially_hazardous_asteroid: any;
  is_sentry_object: any;
  close_approach_data: [
    {
      close_approach_date: any;
      close_approach_date_full: any;
      epoch_date_close_approach: any;
      orbiting_body: any;
      relative_velocity: {
        kilometers_per_second: any;
        kilometers_per_hour: any;
        miles_per_hour: any;
      };
      miss_distance: {
        astronomical: any;
        lunar: any;
        kilometers: any;
        miles: any;
      };
    }
  ];
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: any;
      estimated_diameter_max: any;
    };
    meters: {
      estimated_diameter_min: any;
      estimated_diameter_max: any;
    };
    miles: {
      estimated_diameter_min: any;
      estimated_diameter_max: any;
    };
    feet: {
      estimated_diameter_min: any;
      estimated_diameter_max: any;
    };
  };
  links: any;
  nasa_jpl_url: any;
}

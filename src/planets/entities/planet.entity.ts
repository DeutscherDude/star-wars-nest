export class Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Array<any>;
  films: Array<any>;
  created: string;
  edited: string;
  url: string;
}

export class PlanetFetchResult {
  count: number;
  next: string;
  previous: null;
  results: Planet[];
}

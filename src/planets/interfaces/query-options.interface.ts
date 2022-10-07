export interface IQueryOptions {
  planet: {
    name?: string;
    rotation_period?: string;
    orbital_period?: string;
    diameter?: string;
    climate?: string;
    gravity?: string;
    terrain?: string;
    surface_water?: string;
    population?: string;
    residents?: Array<string>;
    films?: Array<string>;
    created?: string;
    edited?: string;
    url?: string;
  };
  pagination: {
    limit?: number;
    offset?: number;
  };
}

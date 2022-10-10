import { QueryOptionsDto } from '../../planets/dtos/query-options.dto';

interface IQueryOptions {
  planet: {
    name: string | undefined;
    rotation_period: string | undefined;
    orbital_period: string | undefined;
    diameter: string | undefined;
    climate: string | undefined;
    gravity: string | undefined;
    terrain: string | undefined;
    surface_water: string | undefined;
    population: string | undefined;
    residents: string[] | undefined;
    films: string[] | undefined;
    created: string | undefined;
    edited: string | undefined;
    url: string | undefined;
  };
  pagination: {
    limit: number;
    offset: number;
  };
}

export const generateQueryOptions = (
  queryOptionsDto: QueryOptionsDto,
): IQueryOptions => {
  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
    created,
    edited,
    url,
    limit,
    offset,
  } = queryOptionsDto;
  return {
    planet: {
      name: name,
      rotation_period: rotation_period,
      orbital_period: orbital_period,
      diameter: diameter,
      climate: climate,
      gravity: gravity,
      terrain: terrain,
      surface_water: surface_water,
      population: population,
      residents: residents,
      films: films,
      created: created,
      edited: edited,
      url: url,
    },
    pagination: {
      limit: limit,
      offset: offset,
    },
  };
};

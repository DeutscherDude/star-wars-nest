import { QueryOptionsDto } from '../../planets/dtos/queryOptions.dto';
import { isObjectWithOnlyUndefined } from './type.guards';

export const generateQueryOptions = (queryOptionsDto: QueryOptionsDto) => {
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
  const query = {
    planet: {
      name: name,
      rotation_period: rotation_period,
      orbital_period: orbital_period,
      diameter: diameter,
      climate: climate,
      gtravity: gravity,
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
  if (isObjectWithOnlyUndefined(query)) {
    return undefined;
  }
};

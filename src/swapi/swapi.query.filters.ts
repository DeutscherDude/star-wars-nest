import { isUndefined } from '../common/utils/type.guards';
import { Planet } from '../planets/entities/planet.entity';
import { IQueryOptions } from '../planets/interfaces/query-options.interface';

export const queryOptionsArray: string[] = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'residents',
  'films',
  'created',
  'edited',
  'url',
];

export const filterAll = async (
  planets: Planet[],
  queryOptions?: IQueryOptions,
): Promise<Planet[]> => {
  if (isUndefined(queryOptions)) return planets;

  for (const option of queryOptionsArray) {
    if (!queryOptions?.planet[option as keyof Planet]) {
    } else {
      planets = planets.filter((planet) =>
        planet[option as keyof Planet].includes(
          queryOptions?.planet[option as keyof Planet] as string,
        ),
      );
    }
  }
  return planets;
};

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

// export const climateFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.climate) {
//     return planets;
//   }

//   // Typescript was screaming otherwise
//   const { climate } = queryOptions.planet;

//   return planets.filter((val) => val.climate.includes(climate));
// };

// export const createdFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet.created) {
//     return planets;
//   }

//   return planets.filter((val) => val.created === queryOptions.planet.created);
// };

// export const diameterFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet.diameter) {
//     return planets;
//   }

//   return planets.filter((val) => val.diameter === queryOptions.planet.diameter);
// };

// export const editedFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.edited) {
//     return planets;
//   }

//   return planets.filter((val) => val.edited === queryOptions.planet.edited);
// };

// export const filmsFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.films) {
//     return planets;
//   }

//   return planets.filter((val) => val.films === queryOptions.planet.films);
// };

// export const gravityFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.gravity) {
//     return planets;
//   }

//   return planets.filter((val) => val.gravity === queryOptions.planet.gravity);
// };

// export const populationFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.population) {
//     return planets;
//   }

//   return planets.filter(
//     (val) => val.population === queryOptions.planet.population,
//   );
// };

// export const residentsFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.residents) {
//     return planets;
//   }

//   return planets.filter(
//     (val) => val.residents === queryOptions.planet.residents,
//   );
// };

// export const surfaceWaterFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.surface_water) {
//     return planets;
//   }

//   return planets.filter(
//     (val) => val.surface_water === queryOptions.planet.surface_water,
//   );
// };

// export const terrainFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions,
// ) => {
//   if (!queryOptions?.planet?.terrain) {
//     return planets;
//   }

//   // Typescript was screaming otherwise
//   const { terrain } = queryOptions.planet;

//   return planets.filter((val) => val.terrain.includes(terrain));
// };

// export const urlFilter = (
//   planets: Planet[],
//   queryOptions?: IQueryOptions | undefined,
// ) => {
//   if (!queryOptions?.planet?.url) {
//     return planets;
//   }

//   return planets.filter((val) => val.url === queryOptions.planet.url);
// };

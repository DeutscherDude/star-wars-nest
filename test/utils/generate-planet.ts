import { faker } from '@faker-js/faker';
import { Planet } from 'src/planets/entities/planet.entity';

export const generatePlanet = (): Planet => {
  return {
    name: faker.name.firstName(),
    rotation_period: faker.datatype.number({ min: 10, max: 150 }).toString(),
    orbital_period: faker.datatype.number({ min: 100, max: 1500 }).toString(),
    diameter: faker.datatype.number({ min: 1000, max: 80000 }).toString(),
    climate: faker.random.words(),
    gravity: faker.random.word(),
    terrain: faker.random.words(),
    surface_water: faker.datatype.number({ min: 0, max: 100 }).toString(),
    population: faker.datatype.number({ min: 0, max: 1000000 }).toString(),
    residents: faker.datatype.array(),
    films: faker.datatype.array(),
    created: faker.date.past().toDateString(),
    edited: faker.date.recent().toDateString(),
    url: faker.internet.url(),
  };
};

/**
 * Generate multiple planets using faker
 * @param amount of planets to generate. (Default = 10)
 */
export const generateMultiplePlanets = (amount = 10): Planet[] => {
  const planets: Planet[] = [];
  for (amount; amount > 0; amount - 1) {
    planets.push(generatePlanet());
  }
  return planets;
};

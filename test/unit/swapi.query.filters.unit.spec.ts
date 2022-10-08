import { filterAll } from '../../src/swapi/swapi.query.filters';
import { generateMultiplePlanets } from '../utils/generate-planet';

describe('SwapiQueryFilters', () => {
  const mockPlanets = generateMultiplePlanets(3);

  describe('filterAll', () => {
    describe('given no filters', () => {
      it('should return all planets', async () => {
        const res = await filterAll(mockPlanets, undefined as any);
        expect(res).toBe(mockPlanets);
      });
    });
    describe('given one filter', () => {
      it('should filter planets by it', async () => {
        mockPlanets[0].climate = 'none';
        mockPlanets[1].climate = 'none';

        const res = await filterAll(mockPlanets, {
          planet: { climate: 'none' },
        } as any);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(2);
        expect(res).toStrictEqual(mockPlanets.slice(0, 2));
      });
    });
    describe('given more than one filter', () => {
      it('should filter planets', async () => {
        mockPlanets[0].climate = 'nah';
        mockPlanets[0].gravity = 'none';
        mockPlanets[1].climate = 'nah';
        mockPlanets[1].gravity = 'none';

        const res = await filterAll(mockPlanets, {
          planet: { climate: 'nah', gravity: 'none' },
        } as any);
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(2);
        expect(res).toStrictEqual(mockPlanets.slice(0, 2));
      });
    });
  });
});

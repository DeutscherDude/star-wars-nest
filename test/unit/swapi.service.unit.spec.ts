import { EnvService } from '@env/env.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from '@swapi/swapi.service';
import { BehaviorSubject, take } from 'rxjs';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpService: HttpService;

  const firstPlanet = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
      'https://swapi.dev/api/people/4/',
      'https://swapi.dev/api/people/6/',
      'https://swapi.dev/api/people/7/',
      'https://swapi.dev/api/people/8/',
      'https://swapi.dev/api/people/9/',
      'https://swapi.dev/api/people/11/',
      'https://swapi.dev/api/people/43/',
      'https://swapi.dev/api/people/62/',
    ],
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/4/',
      'https://swapi.dev/api/films/5/',
      'https://swapi.dev/api/films/6/',
    ],
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    url: 'https://swapi.dev/api/planets/1/',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SwapiService, EnvService],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined smoke test', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should fetch all planets', async () => {
      const res = await service.findAll();
      expect(res).toBeInstanceOf(Array);
      expect(res.length).toBe(60);
    });
  });

  describe('findManyByParams', () => {
    describe('given no offset or limit', () => {
      it('should return 60 entries in an array', async () => {
        const res = await service.findManyByParams({
          planet: {},
          pagination: {},
        });
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(60);
      });
    });

    describe('given offset and limit', () => {
      it('should fetch a specified range of pages', async () => {
        const res = await service.findManyByParams({
          planet: {},
          pagination: { offset: 1, limit: 2 },
        });

        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(20);
      });
      it('should fetch empty array if offset > limit', async () => {
        const res = await service.findManyByParams({
          planet: {},
          pagination: { offset: 7, limit: 2 },
        });
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(0);
      });
    });

    describe('findOneById', () => {
      describe('given an existing id', () => {
        it('should return a planet', async () => {
          const res = await service.findOneById('1');
          res.subscribe((value) => {
            expect(JSON.stringify(value)).toBe(JSON.stringify(firstPlanet));
          });
        });
      });
    });
  });
});

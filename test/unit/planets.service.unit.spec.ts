import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import Axios from 'axios';
import { Observable } from 'rxjs';
import { EnvService } from '../../src/env/env.service';
import { PlanetsService } from '../../src/planets/planets.service';
import { generatePlanet } from '../utils/generate-planet';

export const mockPlanetFetchResult = {
  data: {
    count: 20,
    next: 'null',
    previous: null,
    results: [generatePlanet(), generatePlanet(), generatePlanet()],
  },
  status: 200,
  statusText: 'Lala',
  headers: { something: 'application/json' },
  config: {},
};

describe('PlanetsService', () => {
  let service: PlanetsService;
  let httpService: HttpService;
  const dummyObservable = new Observable((sub) => {
    sub.next(mockPlanetFetchResult);
    sub.next(mockPlanetFetchResult);
    setTimeout(() => {
      sub.next(mockPlanetFetchResult);
      sub.complete();
    }, 500);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
        HttpService,
        EnvService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: Axios.create(),
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    describe('given no server error', () => {
      it('should return all planets', async () => {
        jest.spyOn(httpService, 'get').mockReturnValue(dummyObservable as any);
        const whatever = await service.findAll();
        expect(whatever).toBeDefined();
        expect(whatever).toBeInstanceOf(Array);
      });
    });
  });

  it.todo('findOneById');
  it.todo('findOneByName');
  it.todo('findByTerrain');
  it.todo('findByTerrain');
});

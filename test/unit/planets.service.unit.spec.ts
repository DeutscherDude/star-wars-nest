import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IQueryOptions } from '@planets/dtos/queryOptions.dto';
import { SwapiService } from '@swapi/swapi.service';
import Axios from 'axios';
import { Observable } from 'rxjs';
import { AxiosException } from '../../src/common/exceptions/customErrors';
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
  let swapiService: SwapiService;
  const findAllMock = jest.fn();
  const findManyByParamsMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
        {
          provide: SwapiService,
          useValue: {
            findAll: findAllMock,
            findManyByParams: findManyByParamsMock,
          },
        },
        EnvService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: Axios.create(),
        },
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
    swapiService = module.get<SwapiService>(SwapiService);
  });

  it('should be defined smoke test', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    describe('given no query parameter', () => {
      it('should return all planets', async () => {
        findAllMock.mockReturnValueOnce(mockPlanetFetchResult.data.results);
        const res = await service.findMany();
        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Array);
        expect(swapiService.findAll).toBeCalled();
      });
    });

    describe('given a query parameter', () => {
      it('should return a filtered array of planets', async () => {
        const mockQuery: IQueryOptions = {
          planet: {
            climate: 'arid',
          },
          pagination: {},
        };
        findManyByParamsMock.mockReturnValueOnce(mockPlanetFetchResult.data);
        const res = await service.findMany(mockQuery);
        expect(res).toBeDefined();
        expect(res).toBe(mockPlanetFetchResult.data);
        expect(swapiService.findManyByParams).toBeCalledWith(mockQuery);
      });
    });
  });
});

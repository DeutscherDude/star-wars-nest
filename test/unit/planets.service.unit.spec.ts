import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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

export const malformedFetchRes = {
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
  const malformedObservable = new Observable((sub) => {
    sub.next(malformedFetchRes);
    sub.complete();
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
        const res = await service.findAll();
        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Array);
      });
    });

    describe('given no server response', () => {
      it('should throw an error', async () => {
        jest.spyOn(httpService, 'get').mockReturnValueOnce(undefined as any);
        try {
          await service.findAll();
        } catch (err) {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(AxiosException);
        }
      });
    });

    describe('given response w/o data', () => {
      it('should throw an error', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockReturnValueOnce(malformedObservable as any);

        try {
          await service.findAll();
        } catch (err) {
          expect(err).toBeDefined();
          expect(err).toBeInstanceOf(AxiosException);
        }
      });
    });
  });

  it.todo('findOneById');
  it.todo('findOneByName');
  it.todo('findByTerrain');
  it.todo('findByTerrain');
});

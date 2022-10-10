import {
  AxiosException,
  PlanetNotFoundException,
} from '@common/exceptions/customErrors';
import { generateQueryOptions } from '@common/utils/generateQueryOptions';
import { HttpService } from '@nestjs/axios';
import { CacheModule, Logger, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import Axios from 'axios';
import { EnvService } from '../../src/env/env.service';
import { PlanetsController } from '../../src/planets/planets.controller';
import { PlanetsService } from '../../src/planets/planets.service';
import { RedisService } from '../../src/redis/redis.service';
import { SwapiService } from '../../src/swapi/swapi.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  const findManyMock = jest.fn();
  const findOneByIdMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        EnvService,
        HttpService,
        Logger,
        {
          provide: PlanetsService,
          useValue: {
            findMany: findManyMock,
            findOneById: findOneByIdMock,
          },
        },
        {
          provide: 'REDIS_OPTIONS',
          useValue: {},
        },
        {
          provide: RedisService,
          useValue: {},
        },
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: Axios.create(),
        },
        {
          provide: SwapiService,
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: CacheModule,
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('findMany', () => {
    describe('given a query string', () => {
      it('should call planetsService.finaMany with the query', async () => {
        const dummyQuery = generateQueryOptions({ test: 'yes' } as any);
        await controller.findMany(dummyQuery as any);
        expect(findManyMock).toHaveBeenCalledWith(dummyQuery);
      });
    });

    describe('given an unexpected error', () => {
      it('should throw it', async () => {
        findManyMock.mockRejectedValueOnce(new Error('test'));
        expect(async () => {
          await controller.findMany({} as any);
        }).rejects.toThrow('test');
      });
    });

    describe('given an axiosException', () => {
      it('should throw NotFoundException', async () => {
        findManyMock.mockRejectedValueOnce(new AxiosException('Test'));
        expect(async () => {
          await controller.findMany({} as any);
        }).rejects.toThrowError(new NotFoundException('Test'));
        expect(findManyMock).toHaveBeenCalledWith(
          generateQueryOptions({} as any),
        );
      });
    });
  });

  describe('findOneById', () => {
    describe('given no errors', () => {
      it('should call findOneById', async () => {
        await controller.findOneById('1');
        expect(findOneByIdMock).toHaveBeenCalledWith('1');
      });
    });

    describe('given an unexpected error', () => {
      it('should throw it', async () => {
        findOneByIdMock.mockRejectedValueOnce(new Error('test'));
        expect(async () => {
          await controller.findOneById('1');
        }).rejects.toThrow('test');
        expect(findOneByIdMock).toHaveBeenCalledWith('1');
      });
    });

    describe('given PlanetNotFoundException', () => {
      it('should throw NotFoundException', () => {
        findOneByIdMock.mockRejectedValueOnce(
          new PlanetNotFoundException('test'),
        );
        expect(async () => {
          await controller.findOneById('1');
        }).rejects.toThrowError(new NotFoundException('test'));
        expect(findOneByIdMock).toHaveBeenCalledWith('1');
      });
    });
  });
});

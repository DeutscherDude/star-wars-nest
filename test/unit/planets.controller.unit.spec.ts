import { AxiosException } from '@common/exceptions/customErrors';
import { generateQueryOptions } from '@common/utils/generateQueryOptions';
import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from '@swapi/swapi.service';
import Axios from 'axios';
import { RedisService } from 'src/redis/redis.service';
import { EnvService } from '../../src/env/env.service';
import { PlanetsController } from '../../src/planets/planets.controller';
import { PlanetsService } from '../../src/planets/planets.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;
  let planetsService: PlanetsService;
  const findManyMock = jest.fn();
  const findOneByIdMock = jest.fn();
  const mockQuery = {
    climate: 'arid',
    limit: 1,
    offset: 1,
    firstPage: 1,
    lastPage: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        {
          provide: PlanetsService,
          useValue: {
            findMany: findManyMock,
            findOneById: findOneByIdMock,
          },
        },
        EnvService,
        {
          provide: SwapiService,
          useValue: {},
        },
        {
          provide: RedisService,
          useValue: {},
        },
        HttpService,
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: Axios.create(),
        },
      ],
    }).compile();

    controller = module.get<PlanetsController>(PlanetsController);
    planetsService = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findMany', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('given no error', () => {
      it('should return the result of planetsService.findMany', async () => {
        findManyMock.mockReturnValueOnce(1);

        const res = await controller.findMany(mockQuery);
        expect(planetsService.findMany).toBeCalledWith(
          generateQueryOptions(mockQuery),
        );
        expect(res).toBe(1);
      });
    });

    describe('given an error', () => {
      it('given AxiosException, should throw', async () => {
        findManyMock.mockImplementation(() => {
          throw new AxiosException();
        });

        controller.findMany(mockQuery).catch((e) => {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toBe('Not Found');
        });
      });
    });
  });
});

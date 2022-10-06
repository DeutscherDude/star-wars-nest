import { HttpService } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import Axios from 'axios';
import { EnvService } from '../../src/env/env.service';
import { PlanetsController } from '../../src/planets/planets.controller';
import { PlanetsService } from '../../src/planets/planets.service';
import { RedisService } from '../../src/redis/redis.service';
import { SwapiService } from '../../src/swapi/swapi.service';

describe('PlanetsController', () => {
  let controller: PlanetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanetsController],
      providers: [
        PlanetsService,
        EnvService,
        HttpService,
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
});

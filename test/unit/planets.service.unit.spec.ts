import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import Axios from 'axios';
import { EnvService } from '../../src/env/env.service';
import { PlanetsService } from '../../src/planets/planets.service';

describe('PlanetsService', () => {
  let service: PlanetsService;
  let httpService: HttpService;

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
        jest.spyOn(httpService, 'get').mockReturnValueOnce()
        const whatever = await service.findAll();
      });
    });
  });

  it.todo('findOneById');
  it.todo('findOneByName');
  it.todo('findByTerrain');
  it.todo('findByTerrain');
});

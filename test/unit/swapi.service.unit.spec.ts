import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from 'src/env/env.service';
import { SwapiService } from '../../src/swapi/swapi.service';
import { generateMultiplePlanets } from '../utils/generate-planet';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpService: HttpService;
  let envService: EnvService;
  const mockPlanets = generateMultiplePlanets(5);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnThis(),
            pipe: jest.fn(),
          },
        },
        EnvService,
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
    httpService = module.get<HttpService>(HttpService);
    envService = module.get<EnvService>(EnvService);
  });

  it('Smoke test', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('findOneById', async () => {
      jest.spyOn(httpService, 'get');
      await service.findOneById('1');
      expect(httpService.get).toHaveBeenCalledWith(`${envService.swapiURL}1/`);
    });
  });

  describe('findManyByParams', () => {
    it('findManyByParams', async () => {
      jest
        .spyOn(service as any, 'fetchPages')
        .mockResolvedValueOnce(mockPlanets);

      await service.findManyByParams();
      const serviceSpy = service as any;
      expect(serviceSpy.fetchPages).toHaveBeenCalled();
    });
  });

  it.todo('findAll');
  it.todo('findManyByParams');
});

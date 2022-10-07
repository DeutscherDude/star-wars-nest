import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable, Subject } from 'rxjs';
import { EnvService } from 'src/env/env.service';
import { SwapiService } from '../../src/swapi/swapi.service';
import { generateMultiplePlanets } from '../utils/generate-planet';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpService: HttpService;
  let envService: EnvService;
  const mockPlanets = generateMultiplePlanets(6);
  const mockObservable = {
    data: {
      results: mockPlanets,
    },
  };
  const dummyObservable = new Subject();
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

  describe('fetchPages', () => {
    it('should call generatePageRequests', async () => {
      const serviceSpy = service as any;
      jest
        .spyOn(serviceSpy, 'generatePageRequests')
        .mockResolvedValueOnce(mockPlanets);

      const res = await serviceSpy.fetchPages();
      expect(serviceSpy.generatePageRequests).toHaveBeenCalledWith(
        envService.swapiURL,
        1,
        6,
      );
      expect(res).toMatchObject(mockPlanets);
    });
  });

  describe('generatePageRequests', () => {
    it('should return an array of Promises: httpService requests', async () => {
      const serviceSpy = service as any;

      jest.clearAllMocks();

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(dummyObservable as any);

      //TODO: Figure out mocking of Observables

      // const res = await serviceSpy.generatePageRequests('test@test.com');
    });
  });

  describe('findAll', () => {
    it('should return all planets', async () => {
      const serviceSpy = service as any;
      jest.spyOn(serviceSpy, 'fetchPages').mockReturnValueOnce(mockPlanets);

      const res = await serviceSpy.findAll();
      expect(res).toMatchObject(mockPlanets);
      expect(serviceSpy.fetchPages).toHaveBeenCalled();
    });
  });

  it.todo('findAll');
  it.todo('findManyByParams');
});

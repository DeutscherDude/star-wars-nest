import { EnvService } from '@env/env.service';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from '@swapi/swapi.service';

describe('SwapiService', () => {
  let service: SwapiService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        EnvService,
      ],
    }).compile();

    service = module.get(SwapiService);
  });

  it('should be defined smoke test', () => {
    expect(service).toBeDefined();
  });
});

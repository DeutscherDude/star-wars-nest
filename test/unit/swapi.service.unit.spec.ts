import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from 'src/env/env.service';
import { SwapiService } from '../../src/swapi/swapi.service';

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

    service = module.get<SwapiService>(SwapiService);
  });

  it('Smoke test', () => {
    expect(service).toBeDefined();
  });

  it.todo('findOneById');
  it.todo('findAll');
  it.todo('findManyByParams');
});

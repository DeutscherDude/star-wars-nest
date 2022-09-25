import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from 'src/env/env.service';

describe('SwapiService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        EnvService,
      ],
    }).compile();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from '../../src/env/env.service';
import { RedisService } from '../../src/redis/redis.service';

describe('RedisService', () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        { provide: EnvService, useValue: {} },
        { provide: 'REDIS_OPTIONS', useValue: {} },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { EnvService } from 'src/env/env.service';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from 'src/redis/redis.service';

describe('RedisService', () => {
  let service: RedisService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: EnvService,
          useValue: {
            redisUrl: process.env.REDIS_TESTING_URL,
          },
        },
        { provide: 'REDIS_OPTIONS', useValue: {} },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    // Workaround :)
    const serviceSpy = service as any;
    serviceSpy.client.disconnect();
  });

  it('should be defined some test', () => {
    expect(service).toBeDefined();
  });
});

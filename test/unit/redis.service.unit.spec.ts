import { EnvService } from 'src/env/env.service';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from 'src/redis/redis.service';

describe('RedisService', () => {
  let service: RedisService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: EnvService,
          useValue: {
            redisUrl: process.env.REDIS_TESTING_URL,
          },
        },
        { provide: 'REDIS_OPTIONS', useValue: { ttl: 15 } },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    // Workaround :)
    const serviceSpy = service as any;
    await serviceSpy.client.quit();
  });

  it('should be defined some test', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should set a redis key', async () => {
      const response = await service.set('lala', 'test');
      const val = await service.get('lala');
      expect(val).toBe('test');
      expect(response).toBe('OK');
    });
    it('should return null if there is no such key', async () => {
      const response = await service.get('nopers');
      expect(response).toBe(null);
    });
  });
});

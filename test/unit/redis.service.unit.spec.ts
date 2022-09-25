import { EnvService } from '@env/env.service';
import { Test, TestingModule } from '@nestjs/testing';
import Redis from 'ioredis';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';

describe('RediService', () => {
  let redisService: RedisService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [RedisModule.register({ ttl: 30, max: 2 })],
      providers: [
        {
          provide: EnvService,
          useValue: {
            redisUrl: 'redis://redis:6379',
          },
        },
      ],
    }).compile();

    redisService = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    const redisClient = redisService.getClient();
    redisClient.shutdown();
  });

  it('should be defined some test', () => {
    expect(redisService).toBeDefined();
  });

  describe('getClient', () => {
    it('should return the Redis Client', () => {
      const redisClient = redisService.getClient();
      expect(redisClient).toBeInstanceOf(Redis);
    });
  });
});

import { RedisInterceptor } from '@common/interceptors/redis.interceptor';
import {
  CacheKey,
  CACHE_KEY_METADATA,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

describe('@RedisInterceptor', () => {
  @Controller('test')
  @CacheKey('a_test')
  @UseInterceptors(RedisInterceptor)
  class TestMe {}

  it('should do something O.o', () => {
    expect(Reflect.getMetadata(CACHE_KEY_METADATA, TestMe)).toBe('a_test');
  });
});

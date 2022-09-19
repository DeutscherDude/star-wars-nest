import {
  CACHE_MANAGER,
  CACHE_TTL_METADATA,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { Observable, of, tap } from 'rxjs';
import { RedisService } from '../../redis/redis.service';
import { isNull, isUndefined } from '../utils/type.guards';
import { RedisKey, RedisValue } from 'ioredis';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';

@Injectable()
export class RedisInterceptor implements NestInterceptor {
  @Optional()
  @Inject(HTTP_ADAPTER_HOST)
  protected readonly httpAdapterHost: HttpAdapterHost;
  constructor(
    @Inject(CACHE_MANAGER) private readonly redisService: RedisService,
    @Inject(Reflector) protected readonly reflector: any,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const ttlValue =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    if (!key) {
      return next.handle();
    }
    try {
      const value = this.redisService.get(key);
      if (!isUndefined(value) || isNull(value)) {
        return of(value);
      }

      const ttl = ttlValue;
      return next.handle().pipe(
        tap(async (response) => {
          const args =
            isNull(ttl) || isUndefined(ttl)
              ? [key as RedisKey, response as RedisValue]
              : [key as RedisKey, response as RedisValue, { ttl }];

          try {
            await this.redisService.set(...args);
          } catch (err) {
            console.log(err);
          }
        }),
      );
    } catch (err) {
      return next.handle();
    }
  }
}

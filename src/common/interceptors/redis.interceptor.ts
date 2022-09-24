import {
  CACHE_KEY_METADATA,
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
import { stringify } from 'querystring';
import { Observable, of, tap } from 'rxjs';
import { REDIS_CACHE } from '../../redis/redis.module';
import { RedisService } from '../../redis/redis.service';
import { isNull, isUndefined } from '../utils/type.guards';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';

@Injectable()
export class RedisInterceptor implements NestInterceptor {
  @Optional()
  @Inject(HTTP_ADAPTER_HOST)
  protected readonly httpAdapterHost: HttpAdapterHost;
  constructor(
    private readonly redisService: RedisService,
    @Inject(Reflector) protected readonly reflector: any,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const ttlValue =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    console.log('Inside the Redis interceptor');

    if (!key) {
      return next.handle();
    }
    try {
      const value = await this.redisService.get(key);
      if (!isUndefined(value) && !isNull(value)) {
        const returnValue = JSON.parse(value);
        return of(returnValue);
      }

      const ttl = ttlValue;
      return next.handle().pipe(
        tap(async (response) => {
          const args =
            isNull(ttl) || isUndefined(ttl)
              ? [key, response]
              : [key, response, { ttl }];

          try {
            await this.redisService.set(key, JSON.stringify(args));
          } catch (err) {
            console.log(err);
          }
        }),
      );
    } catch (err) {
      console.log(err);
      return next.handle();
    }
  }

  protected trackBy(context: ExecutionContext) {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      console.log('Cache metadata: ' + cacheMetadata);
      return cacheMetadata;
    }

    const request = context.getArgByIndex(0);
    console.log('Request context: ' + request);
    if (!this.isRequestCacheable(context)) {
      console.log('Trackby returning undefined');
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }

  protected isRequestCacheable(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req.method === 'GET';
  }
}

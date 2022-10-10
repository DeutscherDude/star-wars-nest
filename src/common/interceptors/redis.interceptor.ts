import {
  CACHE_KEY_METADATA,
  CACHE_TTL_METADATA,
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { Observable, of, tap, throwError } from 'rxjs';
import { RedisService } from '../../redis/redis.service';
import { isEmptyObject, isNull, isUndefined } from '../utils/type.guards';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
@Injectable()
export class RedisInterceptor implements NestInterceptor {
  @Optional()
  @Inject(HTTP_ADAPTER_HOST)
  protected readonly httpAdapterHost: HttpAdapterHost;
  constructor(
    private readonly redisService: RedisService,
    private readonly loggerService: Logger,
    @Inject(Reflector) protected readonly reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
    // eslint-disable-next-line
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const ttlValue =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    if (isUndefined(key)) {
      return next.handle();
    }
    const normalizedKey = await this.sortQueryParams(key);

    try {
      const value = await this.redisService.get(normalizedKey);

      if (!isUndefined(value) && !isNull(value)) {
        const returnValue = JSON.parse(value);
        return of(returnValue);
      }
      const ttl = ttlValue;
      return next.handle().pipe(
        tap(async (response) => {
          const args =
            isNull(ttl) || isUndefined(ttl)
              ? [normalizedKey, response]
              : [normalizedKey, response, { ttl }];

          try {
            await this.redisService.set(normalizedKey, JSON.stringify(args));
          } catch (err) {
            this.loggerService.error(err);
            throwError(() => err);
          }
        }),
      );
    } catch (err) {
      this.loggerService.error(err);
      return next.handle();
    }
  }
  protected trackBy(context: ExecutionContext): string | undefined {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );
    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }
    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }
  protected isRequestCacheable(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return req.method === 'GET';
  }

  private async sortQueryParams(key: string): Promise<string> {
    const url = new URL(key, 'http://localhost:3000');
    if (isEmptyObject(url.searchParams)) {
      return key;
    }
    // eslint-disable-next-line
    const tempArray: Array<any> = [];
    url.searchParams.forEach((key, value) => {
      tempArray.push(value + '=' + key);
    });
    return tempArray.sort().join('&');
  }
}

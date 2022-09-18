import { HttpModule } from '@nestjs/axios';
import { CacheModule, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvModule } from './env/env.module';
import { PlanetsModule } from './planets/planets.module';
import { SwapiModule } from './swapi/swapi.module';
import { HttpExceptionFilter } from './common/exception-filter/http.exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { ErrorHandlingService } from './error-handling/error-handling.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    PlanetsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    CacheModule.registerAsync({
      useFactory: () => ({ ttl: 36000, max: 20 }),
    }),
    EnvModule,
    SwapiModule,
    ErrorHandlingModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ErrorHandlingService,
    Logger,
  ],
})
export class AppModule {}

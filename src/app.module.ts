import { HttpModule } from '@nestjs/axios';
import { CacheModule, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PlanetsModule } from '@planets/planets.module';
import { HttpExceptionFilter } from './common/exception-filter/http.exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { ErrorHandlingService } from './error-handling/error-handling.service';
import { SwapiModule } from '@swapi/swapi.module';
import { EnvModule } from '@env/env.module';

@Module({
  imports: [
    PlanetsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    EnvModule,
    SwapiModule,
    ErrorHandlingModule,
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

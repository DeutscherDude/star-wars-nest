import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvModule } from './env/env.module';
import { PlanetsModule } from './planets/planets.module';
import { SwapiModule } from './swapi/swapi.module';

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
      useFactory: () => ({ ttl: 15, max: 20 }),
    }),
    EnvModule,
    SwapiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

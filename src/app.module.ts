import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PlanetsModule } from './planets/planets.module';

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
      useFactory: () => ({ ttl: 10, max: 20 }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

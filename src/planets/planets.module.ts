import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { SwapiService } from '../swapi/swapi.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    HttpModule,
    EnvModule,
    RedisModule.register({ ttl: 3600, max: 20 }),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, EnvService, SwapiService],
})
export class PlanetsModule {}

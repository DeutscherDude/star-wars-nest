import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { SwapiService } from '../swapi/swapi.service';
import { RedisModule, REDIS_CACHE } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    HttpModule,
    EnvModule,
    RedisModule.register({ ttl: 36000, max: 20 }),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, EnvService, SwapiService],
})
export class PlanetsModule {}

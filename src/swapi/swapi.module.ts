import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { SwapiService } from './swapi.service';

@Module({
  imports: [HttpModule, EnvModule],
  controllers: [],
  providers: [SwapiService, EnvService],
})
export class SwapiModule {}

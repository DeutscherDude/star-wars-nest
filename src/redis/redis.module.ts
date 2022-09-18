import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { RedisService } from './redis.service';

@Module({
  imports: [EnvModule],
  providers: [EnvService, RedisService],
  exports: [RedisService],
})
export class RedisModule {}

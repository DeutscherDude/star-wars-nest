import { tokens } from '@common/tokens';
import { DynamicModule, Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { RedisOptions, RedisService } from './redis.service';

export const REDIS_CACHE = 'REDIS_CACHE';

@Module({
  imports: [EnvModule],
  providers: [EnvService, RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static register(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: tokens.REDIS_OPTIONS,
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}

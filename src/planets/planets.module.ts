import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';

@Module({
  imports: [HttpModule, EnvModule],
  controllers: [PlanetsController],
  providers: [
    PlanetsService,
    {
      provide: CACHE_MANAGER,
      useClass: CacheModule,
    },
    EnvService,
  ],
})
export class PlanetsModule {}

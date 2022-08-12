import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PlanetsController],
  providers: [
    PlanetsService,
    {
      provide: CACHE_MANAGER,
      useClass: CacheModule,
    },
  ],
})
export class PlanetsModule {}

import { CacheInterceptor, CACHE_MANAGER, Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PlanetsService } from './planets.service';

@Controller('planets')
@UseInterceptors(CacheInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  async findAll() {
    return await this.planetsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.planetsService.findOneById(id);
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string) {
    return await this.planetsService.findOneByName(name);
  }

  @Get('climate/:climate')
  async findByClimate(@Param('climate') climate: string) {
    return await this.planetsService.findByClimate(climate);
  }

  @Get('terrain/:terrain')
  async findByTerrain(@Param('terrain') terrain: string) {
    return await this.planetsService.findByTerrain(terrain);
  }
}

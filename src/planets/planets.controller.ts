import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Planet } from './entities/planet.entity';
import { PlanetsService } from './planets.service';

@Controller('planets')
@UseInterceptors(CacheInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findAll(): Promise<Planet[]> {
    return await this.planetsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Observable<Planet>> {
    return await this.planetsService.findOneById(id);
  }

  @Get('name/:name')
  async findOneByName(@Param('name') name: string): Promise<Planet> {
    return await this.planetsService.findOneByName(name);
  }

  @Get('climate/:climate')
  async findByClimate(@Param('climate') climate: string): Promise<Planet[]> {
    return await this.planetsService.findByClimate(climate);
  }

  @Get('terrain/:terrain')
  async findByTerrain(@Param('terrain') terrain: string): Promise<Planet[]> {
    return await this.planetsService.findByTerrain(terrain);
  }
}

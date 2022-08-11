import { Controller, Get, Param } from '@nestjs/common';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll() {
    const data = this.planetsService.findAll();
    return data;
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.planetsService.findOneById(+id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.planetsService.findOneByName(name);
  }

  @Get('climate/:climate')
  findByClimate(@Param('climate') climate: string) {
    return this.planetsService.findByClimate(climate);
  }
}

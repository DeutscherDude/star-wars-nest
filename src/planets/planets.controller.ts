import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { generateQueryOptions } from '../common/utils/generateQueryOptions';
import { QueryOptionsDto } from './dtos/queryOptions.dto';
import { Planet } from './entities/planet.entity';
import { PlanetsService } from './planets.service';

@Controller('planets')
@UseInterceptors(CacheInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findMany(@Query() queryOptionsDto: QueryOptionsDto): Promise<Planet[]> {
    const query = generateQueryOptions(queryOptionsDto);
    return this.planetsService.findMany(query);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Observable<Planet>> {
    return this.planetsService.findOneById(id);
  }

  @Get('many')
  async findManyByQuery(
    @Query('queryOptions') queryOptionsDto: QueryOptionsDto,
  ) {
    const query = generateQueryOptions(queryOptionsDto);
    return this.planetsService.findMany(query);
  }
}

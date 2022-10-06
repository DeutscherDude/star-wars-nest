import {
  CacheKey,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AxiosException,
  PlanetNotFoundException,
} from '../common/exceptions/customErrors';
import { RedisInterceptor } from '../common/interceptors/redis.interceptor';
import { generateQueryOptions } from '../common/utils/generateQueryOptions';
import { QueryOptionsDto } from './dtos/queryOptions.dto';
import { Planet } from './entities/planet.entity';
import { PlanetsQueryInterceptor } from './interceptors/query-filter.interceptor';
import { PlanetsService } from './planets.service';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @UseInterceptors(RedisInterceptor)
  @Get()
  async findMany(@Query() queryOptionsDto: QueryOptionsDto): Promise<Planet[]> {
    const query = generateQueryOptions(queryOptionsDto);
    try {
      return this.planetsService.findMany(query);
    } catch (err) {
      if (err instanceof AxiosException) {
        throw new NotFoundException(err.message);
      } else {
        throw err;
      }
    }
  }

  @CacheKey('id')
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Observable<Planet>> {
    try {
      return this.planetsService.findOneById(id);
    } catch (err) {
      if (err instanceof PlanetNotFoundException) {
        throw new NotFoundException(err.message);
      } else {
        throw err;
      }
    }
  }
}

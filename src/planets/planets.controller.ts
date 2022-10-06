import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisInterceptor } from 'src/common/interceptors/redis.interceptor';
import {
  AxiosException,
  PlanetNotFoundException,
} from '../common/exceptions/customErrors';
import { generateQueryOptions } from '../common/utils/generateQueryOptions';
import { QueryOptionsDto } from './dtos/queryOptions.dto';
import { Planet } from './entities/planet.entity';
import { PlanetsService } from './planets.service';

@Controller('planets')
@UseInterceptors(RedisInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

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

import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SwapiService } from '../swapi/swapi.service';
import { IQueryOptions } from './dtos/queryOptions.dto';
import { Planet } from './entities/planet.entity';

type obsPlanet = Observable<Planet>;

@Injectable()
export class PlanetsService {
  constructor(private readonly swapiService: SwapiService) {}

  async findMany(query?: IQueryOptions): Promise<Planet[]> {
    if (query === undefined) {
      return await this.swapiService.findAll();
    }
    return await this.swapiService.findManyByParams(query);
  }

  async findOneById(id: string): Promise<obsPlanet> {
    return await this.swapiService.findOneById(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SwapiService } from '../swapi/swapi.service';
import { Planet } from './entities/planet.entity';
import { IQueryOptions } from './interfaces/query-options.interface';

type obsPlanet = Observable<Planet>;

@Injectable()
export class PlanetsService {
  constructor(private readonly swapiService: SwapiService) {}

  async findMany(query?: IQueryOptions): Promise<Planet[]> {
    if (query === undefined) {
      const res = await this.swapiService.findAll();
      return res;
    }
    return await this.swapiService.findManyByParams(query);
  }

  async findOneById(id: string): Promise<obsPlanet> {
    return this.swapiService.findOneById(id);
  }
}

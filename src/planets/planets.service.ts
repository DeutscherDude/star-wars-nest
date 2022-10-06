import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SwapiService } from '../swapi/swapi.service';
import { IQueryOptions } from './dtos/queryOptions.dto';
import { Planet } from './entities/planet.entity';

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

  async findOneByName(name: string): Promise<Planet> {
    const fetch = await this.findMany();
    const planet = fetch.find((val) => val.name === name);
    if (planet === undefined) throw new NotFoundException();
    return planet;
  }

  async findByClimate(climate: string): Promise<Planet[]> {
    const res = await this.findMany();
    return res.filter((res) => res.climate.includes(climate));
  }

  async findByTerrain(terrain: string): Promise<Planet[]> {
    const res = await this.findMany();
    return res.filter((val) => val.terrain.includes(terrain));
  }
}

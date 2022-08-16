import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanetNotFoundException } from '../common/exceptions/customErrors';
import { errorMessages } from '../common/exceptions/error-messages';
import { SWAPI_URL } from '../env/constants.tokens';
import { EnvService } from '../env/env.service';
import { PaginationQueryDto } from './dtos/paginationQuery.dto';
import { Planet } from './entities/planet.entity';

type obsPlanetArray = Observable<Planet[]>;
type obsPlanet = Observable<Planet>;

@Injectable()
export class PlanetsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  async findAll(
    paginationQuery?: PaginationQueryDto,
  ): Promise<Observable<Planet[]>> {
    return this.httpService
      .get((await this.envService.get(SWAPI_URL)) as string, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => {
          return response.data;
        }),
        map((data) => data.results.slice(0, 10)),
        catchError((err) => {
          throw new NotFoundException(err.message);
        }),
      );
  }

  async findOneById(id: string): Promise<obsPlanet> {
    return this.httpService
      .get(`${await this.envService.get(SWAPI_URL)}${id}/`)
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((err) => {
          throw new PlanetNotFoundException(err.message);
        }),
      );
  }

  async findOneByName(name: string): Promise<obsPlanet> {
    const res = await this.findAll();
    return res.pipe(
      map((res) => res.find((res) => res.name === name)),
      catchError((err) => {
        throw new PlanetNotFoundException(err.message);
      }),
    );
  }

  async findByClimate(climate: string): Promise<obsPlanetArray> {
    const res = await this.findAll();
    return res.pipe(
      map((res) => res.filter((res) => res.climate === climate)),
      catchError((err) => {
        throw new PlanetNotFoundException(err.message);
      }),
    );
  }

  async findByTerrain(terrain: string): Promise<obsPlanetArray> {
    const res = await this.findAll();
    return res.pipe(
      map((res) => res.filter((res) => res.terrain.includes(terrain))),
      catchError((err) => {
        throw new PlanetNotFoundException(
          errorMessages.PLANET_TERRAIN_NOT_FOUND,
        );
      }),
    );
  }
}

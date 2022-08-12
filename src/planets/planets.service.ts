import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanetNotFoundException } from 'src/common/exceptions/customErrors';
import { errorMessages } from 'src/common/exceptions/error-messages';
import { EnvService } from 'src/env/env.service';
import { Planet, PlanetFetchResult } from './entities/planet.entity';

type obsPlanetArray = Observable<Planet[]>;
type obsPlanet = Observable<Planet>;

@Injectable()
export class PlanetsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  async findAll(): Promise<Observable<PlanetFetchResult>> {
    return this.httpService
      .get((await this.envService.get('SWAPI_URL')) as string, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => response.data),
        catchError((err) => {
          throw new HttpException(err, 404);
        }),
      );
  }

  async findOneById(id: string): Promise<obsPlanet> {
    return this.httpService.get(`https://swapi.dev/api/planets/${id}/`).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((err) => {
        throw new PlanetNotFoundException();
      }),
    );
  }

  async findOneByName(name: string): Promise<obsPlanet> {
    const res = await this.findAll();
    return res.pipe(
      map((res) => res.results.find((res) => res.name === name)),
      catchError((err) => {
        throw new PlanetNotFoundException();
      }),
    );
  }

  async findByClimate(climate: string): Promise<obsPlanetArray> {
    const res = await this.findAll();
    return res.pipe(
      map((res) => res.results.filter((res) => res.climate === climate)),
      catchError((err) => {
        throw new PlanetNotFoundException();
      }),
    );
  }

  async findByTerrain(terrain: string): Promise<obsPlanetArray> {
    const res = await this.findAll();
    return res.pipe(
      map((res) => res.results.filter((res) => res.terrain.includes(terrain))),
      catchError((err) => {
        throw new PlanetNotFoundException(
          errorMessages.PLANET_TERRAIN_NOT_FOUND,
        );
      }),
    );
  }
}

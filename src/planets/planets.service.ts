import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanetNotFoundException } from '../common/exceptions/customErrors';
import { errorMessages } from '../common/exceptions/error-messages';
import { LinkedList } from '../common/utils/data-structures';
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

  async findAll(paginationQuery?: PaginationQueryDto): Promise<obsPlanetArray> {
    await this.fetchPages();
    return this.httpService
      .get((await this.envService.get(SWAPI_URL)) as string, {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => response.data),
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

  private async fetchPages() {
    let linkedList: LinkedList<Planet[]>;

    const pageOne = firstValueFrom(
      this.httpService
        .get((await this.envService.get(SWAPI_URL)) + '?page=1')
        .pipe(map((data) => data.data.results)),
    );
    const pageTwo = firstValueFrom(
      this.httpService
        .get((await this.envService.get(SWAPI_URL)) + '?page=2')
        .pipe(map((data) => data.data.results)),
    );
    const pageThree = firstValueFrom(
      this.httpService
        .get((await this.envService.get(SWAPI_URL)) + '?page=3')
        .pipe(map((data) => data.data.results)),
    );
    const pageFour = firstValueFrom(
      this.httpService
        .get((await this.envService.get(SWAPI_URL)) + '?page=4')
        .pipe(map((data) => data.data.results)),
    );
    const pageFive = firstValueFrom(
      this.httpService
        .get((await this.envService.get(SWAPI_URL)) + '?page=5')
        .pipe(map((data) => data.data.results)),
    );
    const pageSix = firstValueFrom(
      this.httpService
        .get((await this.envService.get(SWAPI_URL)) + '?page=6')
        .pipe(map((data) => data.data.results)),
    );

    Promise.all([
      pageOne,
      pageTwo,
      pageThree,
      pageFour,
      pageFive,
      pageSix,
    ]).then((responses) => {
      linkedList = new LinkedList(responses[0]);
      for (let k = 1; k < responses.length; k++) {
        linkedList.append(responses[k]);
      }
    });
    return linkedList;
  }
}

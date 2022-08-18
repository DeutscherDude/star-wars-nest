import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlanetNotFoundException } from '../common/exceptions/customErrors';
import { SWAPI_URL } from '../env/constants.tokens';
import { EnvService } from '../env/env.service';
import { PaginationQueryDto } from './dtos/paginationQuery.dto';
import { Planet } from './entities/planet.entity';

type obsPlanet = Observable<Planet>;
type planetArrPromise = Promise<Planet[]>;

@Injectable()
export class PlanetsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  async findAll(paginationQuery?: PaginationQueryDto): Promise<Planet[]> {
    return await this.fetchPages();
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

  async findOneByName(name: string): Promise<Planet> {
    const fetch = await this.findAll();
    const planet = fetch.find((val) => val.name === name);
    if (!planet) throw new NotFoundException();
    return planet;
  }

  async findByClimate(climate: string): Promise<Planet[]> {
    const res = await this.findAll();
    return res.filter((res) => res.climate === climate);
  }

  async findByTerrain(terrain: string): Promise<Planet[]> {
    const res = await this.findAll();
    return res.filter((val) => val.terrain === terrain);
  }

  private async fetchPages(start = 1, end = 6): Promise<Planet[]> {
    const requests = this.generatePageRequests(start, end);

    return await Promise.all(await requests)
      .then((responses: Planet[][]) => {
        let resArray: Planet[] = [];
        responses.forEach((val) => {
          resArray = resArray.concat(val);
        });
        return resArray;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private async generatePageRequests(
    start = 1,
    end = 6,
  ): Promise<planetArrPromise[]> {
    const requests: planetArrPromise[] = [];
    // eslint-disable-next-line no-loops/no-loops
    for (start; start <= end; start++) {
      requests.push(
        firstValueFrom<Planet[]>(
          this.httpService
            .get((await this.envService.get(SWAPI_URL)) + `?page=${start}`)
            .pipe(map((data) => data.data.results)),
        ),
      );
    }
    return requests;
  }
}

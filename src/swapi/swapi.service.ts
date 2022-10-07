import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map, Observable } from 'rxjs';
import {
  AxiosException,
  AxiosTimeoutException,
  PlanetNotFoundException,
} from '../common/exceptions/customErrors';
import { EnvService } from '../env/env.service';
import { requestConfig } from '../planets/config/axiosRequestConfig';
import { Planet } from '../planets/entities/planet.entity';
import { IQueryOptions } from '../planets/interfaces/query-options.interface';
import {
  climateFilter,
  createdFilter,
  diameterFilter,
  editedFilter,
  filmsFilter,
  gravityFilter,
  populationFilter,
  residentsFilter,
  surfaceWaterFilter,
  terrainFilter,
  urlFilter,
} from './swapi.query.filters';

type planetArrPromise = Promise<Planet[]>;
type obsPlanet = Observable<Planet>;

@Injectable()
export class SwapiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  private async fetchPages(start = 1, end = 6): Promise<Planet[]> {
    const requests = this.generatePageRequests(
      this.envService.swapiURL,
      start,
      end,
    );

    return await Promise.all(await requests)
      .then((responses: Planet[][]) => {
        let resArray: Planet[] = [];
        responses.forEach((val) => {
          resArray = resArray.concat(val);
        });
        return resArray;
      })
      .catch((err) => {
        throw new AxiosException(err.message);
      });
  }

  async findOneById(id: string): Promise<obsPlanet> {
    return this.httpService.get(`${this.envService.swapiURL}${id}/`).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((err) => {
        throw new PlanetNotFoundException(err.message);
      }),
    );
  }

  async findAll(): Promise<Planet[]> {
    return await this.fetchPages();
  }

  async findManyByParams(queryOptions?: IQueryOptions): Promise<Planet[]> {
    let planets = await this.fetchPages();

    planets = climateFilter(planets, queryOptions);
    planets = createdFilter(planets, queryOptions);
    planets = diameterFilter(planets, queryOptions);
    planets = editedFilter(planets, queryOptions);
    planets = filmsFilter(planets, queryOptions);
    planets = gravityFilter(planets, queryOptions);
    planets = populationFilter(planets, queryOptions);
    planets = residentsFilter(planets, queryOptions);
    planets = surfaceWaterFilter(planets, queryOptions);
    planets = terrainFilter(planets, queryOptions);
    planets = urlFilter(planets, queryOptions);

    return planets;
  }

  private async generatePageRequests(
    url: string,
    start = 1,
    end = 6,
  ): Promise<planetArrPromise[]> {
    const requests: planetArrPromise[] = [];

    for (start; start <= end; start++) {
      requests.push(
        firstValueFrom<Planet[]>(
          this.httpService.get(url + `?page=${start}`, requestConfig).pipe(
            map((data) => data.data.results),
            catchError((err) => {
              throw new AxiosTimeoutException(err.message);
            }),
          ),
        ),
      );
    }
    return requests;
  }
}

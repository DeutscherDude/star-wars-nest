import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AxiosException,
  AxiosTimeoutException,
  PlanetNotFoundException,
} from '../common/exceptions/customErrors';
import { EnvService } from '../env/env.service';
import { SwapiService } from '../swapi/swapi.service';
import { requestConfig } from './config/axiosRequestConfig';
import { IQueryOptions } from './dtos/queryOptions.dto';
import { Planet } from './entities/planet.entity';

type obsPlanet = Observable<Planet>;
type planetArrPromise = Promise<Planet[]>;

@Injectable()
export class PlanetsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
    private readonly swapiService: SwapiService,
  ) {}

  async findMany(query?: IQueryOptions): Promise<Planet[]> {
    return await this.fetchPages(this.envService.swapiURL);
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

  async findOneByName(name: string): Promise<Planet> {
    const fetch = await this.findMany();
    const planet = fetch.find((val) => val.name === name);
    if (!planet) throw new NotFoundException();
    return planet;
  }

  async findByClimate(climate: string): Promise<Planet[]> {
    const res = await this.findMany();
    return res.filter((res) => res.climate === climate);
  }

  async findByTerrain(terrain: string): Promise<Planet[]> {
    const res = await this.findMany();
    return res.filter((val) => val.terrain === terrain);
  }

  private async fetchPages(url: string, start = 1, end = 6): Promise<Planet[]> {
    const requests = this.generatePageRequests(url, start, end);

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

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom, map } from 'rxjs';
import {
  AxiosException,
  AxiosTimeoutException,
} from '../common/exceptions/customErrors';
import { EnvService } from '../env/env.service';
import { requestConfig } from '../planets/config/axiosRequestConfig';
import { IQueryOptions } from '../planets/dtos/queryOptions.dto';
import { Planet } from '../planets/entities/planet.entity';

type planetArrPromise = Promise<Planet[]>;

@Injectable()
export class SwapiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  async fetchPages(start = 1, end = 6): Promise<Planet[]> {
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

  async findManyByParams(queryOptions: IQueryOptions) {
    console.log(queryOptions);
    return queryOptions;
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

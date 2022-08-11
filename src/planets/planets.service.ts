import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { PlanetNotFoundException } from 'src/common/exceptions/customErrors';
import { PlanetFetchResult } from './entities/planet.entity';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<PlanetFetchResult> {
    return this.httpService
      .get('https://swapi.dev/api/planets/', {
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((response) => response.data),
        catchError((err) => {
          throw new HttpException(err, 404);
        }),
      );
  }

  async findOneById(id: number) {
    return this.httpService.get(`https://swapi.dev/api/planets/${id}/`).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((err) => {
        throw new PlanetNotFoundException();
      }),
    );
  }

  async findOneByName(name: string) {
    return this.findAll().pipe(
      map((res) => res.results.find((res) => res.name === name)),
    );
  }

  async findByClimate(climate: string) {
    return this.findAll().pipe(
      map((res) => res.results)
    );
  }
}

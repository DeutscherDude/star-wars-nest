import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return this.httpService
      .get('https://swapi.dev/api/planets/', {
        headers: { Accept: 'application/json' },
      })
      .pipe(map((response) => response.data));
  }

  async findOne(id: number) {
    return this.httpService
      .get(`https://swapi.dev/api/planets/${id}/`)
      .pipe(map((response) => response.data));
  }
}

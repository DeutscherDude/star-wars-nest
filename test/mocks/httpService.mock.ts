import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { PlanetFetchResult } from 'src/planets/entities/planet.entity';
import { generateMultiplePlanets } from '../utils/generate-planet';
import { Injectable } from '@nestjs/common';

export const mockPlanetFetchResult: AxiosResponse<PlanetFetchResult> = {
  data: {
    count: 20,
    next: 'null',
    previous: null,
    results: generateMultiplePlanets(),
  },
  status: 200,
  statusText: 'Lala',
  headers: { something: 'application/json' },
  config: {},
};

@Injectable()
export class MockHttpService extends HttpService {
  constructor() {
    super();
  }

  // get<T = any>(url: string): Observable<AxiosResponse<T>> {
  //   const observable = new Observable<AxiosResponse>((subscriber) => {
  //     subscriber.next(mockPlanetFetchResult);
  //     subscriber.next(mockPlanetFetchResult);
  //     subscriber.next(mockPlanetFetchResult);
  //   });
  //   return observable;
  // }
}

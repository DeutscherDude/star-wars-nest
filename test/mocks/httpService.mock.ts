import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Planet, PlanetFetchResult } from 'src/planets/entities/planet.entity';
import { generateMultiplePlanets } from '../utils/generate-planet';

const mockPlanetFetchResult: Partial<PlanetFetchResult> = {
  count: 20,
  next: 'null',
  previous: null,
  results: generateMultiplePlanets(),
};

export class MockHttpService extends HttpService {
  constructor() {
    super();
  }

  get<T = any>(url: string): Observable<AxiosResponse<T>> {
    const observable = new Observable((subscriber) => {
      subscriber.next();
    });
  }
}

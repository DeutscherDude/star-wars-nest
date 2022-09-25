import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { isEmptyObject } from 'src/common/utils/type.guards';
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
} from 'src/swapi/swapi.query.filters';

@Injectable()
export class PlanetsQueryInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const query = context.switchToHttp().getRequest().query;
    return next.handle().pipe(
      map((val) => {
        if (!isEmptyObject(query)) {
          let planets = climateFilter(val);
          planets = createdFilter(planets, { planet: query } as any);
          planets = diameterFilter(planets, { planet: query } as any);
          planets = editedFilter(planets, { planet: query } as any);
          planets = filmsFilter(planets, { planet: query } as any);
          planets = gravityFilter(planets, { planet: query } as any);
          planets = populationFilter(planets, { planet: query } as any);
          planets = residentsFilter(planets, { planet: query } as any);
          planets = surfaceWaterFilter(planets, { planet: query } as any);
          planets = terrainFilter(planets, { planet: query } as any);
          planets = urlFilter(planets, { planet: query } as any);
          return planets;
        }
        return val;
      }),
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, tap } from 'rxjs';

@Injectable()
export class PlanetsQueryInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Inside return interceptor');
    return next.handle().pipe(
      map(() => {
        console.log('Inside post-transaction interceptor');
      }),
    );
  }
}

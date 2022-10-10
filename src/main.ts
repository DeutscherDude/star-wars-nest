import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const envService = app.get<EnvService>(EnvService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(envService.nodePort);
}
bootstrap();

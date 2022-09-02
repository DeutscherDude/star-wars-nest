import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  healthCheck(): string {
    return 'Running!';
  }
}

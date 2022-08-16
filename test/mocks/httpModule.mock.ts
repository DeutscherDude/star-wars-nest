import { HttpModuleOptions } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import Axios from 'axios';
import { MockHttpService } from './httpService.mock';

@Module({
  providers: [
    MockHttpService,
    {
      provide: 'AXIOS_INSTANCE_TOKEN',
      useValue: Axios,
    },
  ],
  exports: [MockHttpService],
})
export class MockHttpModule {
  static register(config: HttpModuleOptions) {
    return {
      module: MockHttpModule,
      providers: [
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: Axios.create(config),
        },
        {
          provide: 'HTTP_MODULE_ID',
          useValue: 'mockHttpModule',
        },
      ],
    };
  }
}

import { AxiosRequestConfig } from 'axios';
import { errorMessages } from '../../common/exceptions/error-messages';
import { Planet } from '../entities/planet.entity';

export const requestConfig: AxiosRequestConfig<Planet> = {
  timeoutErrorMessage: errorMessages.AXIOS_TIMEOUT,
};

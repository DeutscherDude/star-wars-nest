import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisKey } from 'ioredis';
import { EnvService } from '../env/env.service';

type RedisValue = string | number | Buffer;

@Injectable()
export class RedisService {
  private client: Redis;
  constructor(
    private readonly envService: EnvService,
    @Inject('REDIS_OPTIONS') private readonly redisOptions: any,
  ) {
    this.client = new Redis(this.envService.redisUrl);
  }

  public setClient(client: Redis) {
    this.client = client;
  }

  public getClient() {
    return this.client;
  }

  public async get(key: RedisKey): Promise<string | null> {
    return this.client.get(key);
  }

  public async set(...args: Record<any, any>[]): Promise<'OK'> {
    args.forEach((arg) => {
      this.client.set(arg.key, arg.value);
      this.client.expire(arg.key, this.redisOptions.ttl);
    });
    return 'OK';
  }
}

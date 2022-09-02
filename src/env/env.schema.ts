import Joi from 'joi';

export enum nodeEnvs {
  PRODUCTION = 'prod',
  STAGING = 'stage',
  DEVELOPMENT = 'dev',
}

export const envSchema = Joi.object({
  NODE_PORT: Joi.number(),
  SWAPI_URL: Joi.string()
    .regex(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    )
    .label('URL'),
  NODE_ENV: Joi.string().valid(...Object.values(nodeEnvs)),
});

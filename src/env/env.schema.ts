import Joi from 'joi';

export enum nodeEnvs {
  PRODUCTION = 'prod',
  STAGING = 'stage',
  DEVELOPMENT = 'dev',
}

const customJoi = Joi.defaults((schema) => {
  switch (schema.type) {
    case 'string':
      return schema.allow('');
    default:
      return schema;
  }
});

export const envSchema = Joi.object({
  NODE_PORT: customJoi.number().required(),
  SWAPI_URL: customJoi
    .string()
    .required()
    .regex(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    )
    .label('URL'),
  NODE_ENV: customJoi
    .string()
    .valid(...Object.values(nodeEnvs))
    .required(),
});

import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { env } from 'process';

const validationSchema = Joi.object({
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.required().default(5432),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
});

const confDefaultEnv: ConfigModuleOptions = {
  validationSchema,
};

const confDevEnv: ConfigModuleOptions = {
  ...confDefaultEnv,
  envFilePath: './.envs/stage.dev.env',
};

const confProdEnv: ConfigModuleOptions = {
  ...confDefaultEnv,
  ignoreEnvFile: true,
};

export const confOptions =
  env.NODE_EV === 'production' ? confProdEnv : confDevEnv;

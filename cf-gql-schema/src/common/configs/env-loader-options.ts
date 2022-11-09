import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { env } from 'process';

const validationSchema = Joi.object({
  DB_PORT: Joi.number().default(5432),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().default('postgres'),
});

const stage =
  env.STAGE === 'dev' ? 'dev' : env.STAGE === 'test' ? 'test' : 'prod';

const commonConfigs: ConfigModuleOptions = {
  envFilePath: `stage.${stage}.env`,
};

const devConfigs: ConfigModuleOptions = {
  ...commonConfigs,
  validationSchema,
};

const prodConfigs: ConfigModuleOptions = {
  ...commonConfigs,
  ignoreEnvFile: true,
};

const envLoaderOptions: ConfigModuleOptions =
  stage !== 'prod'
    ? devConfigs
    : env.STAGE === 'test'
    ? commonConfigs
    : prodConfigs;

export { envLoaderOptions };

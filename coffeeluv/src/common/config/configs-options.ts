/// Database Configuration Options
const configDefaultOptions = {};

export const configDevOptions = { ...configDefaultOptions };
export const configProdOptions = {
  ignoreEnvFile: true,
  ...configDefaultOptions,
};

import * as v from 'valibot';

export default v.object({
  APP_NAME: v.string(),
  BASE_URL: v.string(),
  PORT: v.pipe(
    v.string(),
    v.transform((val) => Number(val)),
    v.number(),
  ),

  // Database
  DATABASE_HOST: v.string(),
  DATABASE_PORT: v.pipe(
    v.string(),
    v.transform((val) => Number(val)),
    v.number(),
  ),
  DATABASE_NAME: v.string(),
  DATABASE_USER: v.string(),
  DATABASE_PASSWORD: v.string(),
  DATABASE_URL: v.string(),
});

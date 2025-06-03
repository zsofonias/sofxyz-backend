import { parse } from 'valibot';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import envSchema from 'src/config/env.schema';
import appConfig from 'src/config/app.config';

const ENV = process.env.NODE_ENV;
const envFilePath = !ENV || ENV === 'production' ? `.env` : `.env.${ENV}.local`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validate: (envVars) => {
        try {
          return parse(envSchema, envVars);
        } catch (err) {
          throw new Error(`[ENV] env validation failed. Please check your .env file.
          Error message: ${err.message}`);
        }
      },
      load: [appConfig],
    }),
    DatabaseModule,
  ],
})
export class CoreModule {}

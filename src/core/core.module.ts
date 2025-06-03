import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';

const ENV = process.env.NODE_ENV;
const envFilePath = !ENV || ENV === 'production' ? `.env` : `.env.${ENV}.local`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    DatabaseModule,
  ],
})
export class CoreModule {}

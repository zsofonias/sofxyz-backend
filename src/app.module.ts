import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { PortfolioModule } from './domain/portfolio/portfolio.module';
import { PaginationModule } from './common/pagination/pagination.module';

import { TransformResponseInterceptor } from './core/interceptors/transform-response/transform-response.interceptor';

@Module({
  imports: [CoreModule, PortfolioModule, PaginationModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}

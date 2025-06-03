import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { FindAllPortfoliosProvider } from './providers/find-all-portfolios/find-all-portfolios.provider';

@Module({
  providers: [PortfolioService, FindAllPortfoliosProvider],
  controllers: [PortfolioController],
})
export class PortfolioModule {}

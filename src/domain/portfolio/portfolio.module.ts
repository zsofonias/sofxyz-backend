import { Module } from '@nestjs/common';

import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';

import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { FindAllPortfoliosProvider } from './providers/find-all-portfolios.provider';
import { FindOneByIdAndUpdateProvider } from './providers/find-one-by-id-and-update-provider';

@Module({
  imports: [ProjectModule, SkillModule],
  providers: [
    PortfolioService,
    FindAllPortfoliosProvider,
    FindOneByIdAndUpdateProvider,
  ],
  controllers: [PortfolioController],
})
export class PortfolioModule {}

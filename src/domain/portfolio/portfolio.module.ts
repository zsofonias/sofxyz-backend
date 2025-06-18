import { forwardRef, Module } from '@nestjs/common';

import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';

import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { FindAllPortfoliosProvider } from './providers/find-all-portfolios.provider';
import { FindOneByIdAndUpdateProvider } from './providers/find-one-by-id-and-update-provider';

@Module({
  imports: [
    forwardRef(() => ProjectModule),
    forwardRef(() => SkillModule),
    forwardRef(() => ExperienceModule),
    forwardRef(() => EducationModule),
  ],
  providers: [
    PortfolioService,
    FindAllPortfoliosProvider,
    FindOneByIdAndUpdateProvider,
  ],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}

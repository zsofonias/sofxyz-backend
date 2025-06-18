import { forwardRef, Module } from '@nestjs/common';

import { PortfolioModule } from '../portfolio.module';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

@Module({
  imports: [forwardRef(() => PortfolioModule)],
  providers: [ExperienceService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}

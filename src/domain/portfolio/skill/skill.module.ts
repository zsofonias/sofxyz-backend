import { forwardRef, Module } from '@nestjs/common';

import { PortfolioModule } from '../portfolio.module';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  imports: [forwardRef(() => PortfolioModule)],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}

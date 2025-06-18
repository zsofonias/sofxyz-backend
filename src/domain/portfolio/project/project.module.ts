import { forwardRef, Module } from '@nestjs/common';

import { PortfolioModule } from '../portfolio.module';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [forwardRef(() => PortfolioModule)],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}

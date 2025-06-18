import { forwardRef, Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { PortfolioModule } from '../portfolio.module';

@Module({
  imports: [forwardRef(() => PortfolioModule)],
  providers: [EducationService],
  controllers: [EducationController],
})
export class EducationModule {}

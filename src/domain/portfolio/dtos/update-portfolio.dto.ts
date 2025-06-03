import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioDto } from './create-portfolio.dto';

export class updatePortfolioDto extends PartialType(CreatePortfolioDto) {}

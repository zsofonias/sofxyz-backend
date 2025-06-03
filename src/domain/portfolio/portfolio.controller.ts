import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { QueryPortfolioDto } from './dtos/query-portfolio.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('portfolios')
@ApiTags('Portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
    return await this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  async getAllPortfolio(@Query() queryPortfolioDto: QueryPortfolioDto) {
    return await this.portfolioService.findAll(queryPortfolioDto);
  }

  @Get(':id')
  async getPortfolioById(@Param() { id }: FindByIdParamsDto) {
    return await this.portfolioService.findOneByIdWithException(id);
  }

  @Patch(':id')
  async updatePortfolioById(
    @Param() { id }: FindByIdParamsDto,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return await this.portfolioService.findOneByIdAndUpdate(
      id,
      updatePortfolioDto,
    );
  }

  @Delete(':id')
  async deletePortfolioById(@Param() { id }: FindByIdParamsDto) {
    return await this.portfolioService.findOneByIdAndDelete(id);
  }
}

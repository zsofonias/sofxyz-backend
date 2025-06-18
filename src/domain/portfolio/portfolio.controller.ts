import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { QueryPortfolioDto } from './dtos/query-portfolio.dto';

@Controller('portfolios')
@ApiTags('Portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOperation({ summary: 'Create a portfolio' })
  @Post()
  async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
    return await this.portfolioService.create(createPortfolioDto);
  }

  @ApiOperation({ summary: 'Get all portfolios' })
  @Get()
  async getAllPortfolio(@Query() queryPortfolioDto: QueryPortfolioDto) {
    return await this.portfolioService.findAll(queryPortfolioDto);
  }

  @ApiOperation({ summary: 'Get a portfolio by id' })
  @Get(':id')
  async getPortfolioById(@Param() { id }: FindByIdParamsDto) {
    return await this.portfolioService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a portfolio by id' })
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

  @ApiOperation({ summary: 'Delete a portfolio by id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePortfolioById(@Param() { id }: FindByIdParamsDto) {
    return await this.portfolioService.findOneByIdAndDelete(id);
  }
}

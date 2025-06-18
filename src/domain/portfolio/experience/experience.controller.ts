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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dtos/create-experience.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdateExperienceDto } from './dtos/update-experience.dto';

@Controller('experiences')
@ApiTags('Experience')
export class ExperienceController {
  constructor(private readonly exprienceService: ExperienceService) {}

  @ApiOperation({
    summary: 'Create a new experience',
  })
  @Post()
  createExprience(@Body() createExperienceDto: CreateExperienceDto) {
    return this.exprienceService.create(createExperienceDto);
  }

  @ApiOperation({
    summary: 'Get all experiences',
  })
  @Get()
  getAllExperiences() {
    return this.exprienceService.findAll();
  }

  @ApiOperation({
    summary: 'Get an experience by id',
  })
  @Get(':id')
  getExperienceById(@Param() { id }: FindByIdParamsDto) {
    return this.exprienceService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update an experience by id',
  })
  @Patch(':id')
  updateExperienceById(
    @Param() { id }: FindByIdParamsDto,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.exprienceService.findOneByIdAndUpdate(id, updateExperienceDto);
  }

  @ApiOperation({
    summary: 'Delete an experience by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteExperienceById(@Param() { id }: FindByIdParamsDto) {
    return this.exprienceService.findOneByIdAndDelete(id);
  }
}

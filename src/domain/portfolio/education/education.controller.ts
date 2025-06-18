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

import { EducationService } from './education.service';
import { CreateEducationDto } from './dtos/create-education.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdateEducationDto } from './dtos/update-education.dto';

@Controller('educations')
@ApiTags('Education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({
    summary: 'Create a new education',
  })
  @Post()
  createExprience(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @ApiOperation({
    summary: 'Get all educations',
  })
  @Get()
  getAllEducations() {
    return this.educationService.findAll();
  }

  @ApiOperation({
    summary: 'Get an education by id',
  })
  @Get(':id')
  getEducationById(@Param() { id }: FindByIdParamsDto) {
    return this.educationService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update an education by id',
  })
  @Patch(':id')
  updateEducationById(
    @Param() { id }: FindByIdParamsDto,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.findOneByIdAndUpdate(id, updateEducationDto);
  }

  @ApiOperation({
    summary: 'Delete an education by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEducationById(@Param() { id }: FindByIdParamsDto) {
    return this.educationService.findOneByIdAndDelete(id);
  }
}

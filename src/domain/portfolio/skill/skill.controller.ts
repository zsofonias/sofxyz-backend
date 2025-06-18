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

import { SkillService } from './skill.service';
import { CreateSkillDto } from './dtos/create-skill.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdateSkillDto } from './dtos/update-skill.dto';

@Controller('skills')
@ApiTags('Skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({
    summary: 'Create a skill',
  })
  @Post()
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @ApiOperation({
    summary: 'Get all skills',
  })
  @Get()
  getAllSkills() {
    return this.skillService.findAll();
  }

  @ApiOperation({
    summary: 'Get a skill by id',
  })
  @Get(':id')
  getSkillById(@Param() { id }: FindByIdParamsDto) {
    return this.skillService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a skill by id',
  })
  @Patch(':id')
  updateSkillById(
    @Param() { id }: FindByIdParamsDto,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillService.findOneByIdAndUpdate(id, updateSkillDto);
  }

  @ApiOperation({
    summary: 'Delete a skill by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSkillById(@Param() { id }: FindByIdParamsDto) {
    return this.skillService.findOneByIdAndDelete(id);
  }
}

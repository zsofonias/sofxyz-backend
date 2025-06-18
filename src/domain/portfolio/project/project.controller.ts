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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/creat-project.dto';
import { FindByIdParamsDto } from 'src/common/dtos/find-by-id-params.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Create a project',
  })
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @ApiOperation({
    summary: 'Get all projects',
  })
  @Get()
  getAllProjects() {
    return this.projectService.findAll();
  }

  @ApiOperation({
    summary: 'Get a project by id',
  })
  @Get(':id')
  getProjectById(@Param() { id }: FindByIdParamsDto) {
    return this.projectService.findOneById(id);
  }

  @ApiOperation({
    summary: 'Update a project by id',
  })
  @Patch(':id')
  updateProjectById(
    @Param() { id }: FindByIdParamsDto,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.findOneByIdAndUpdate(id, updateProjectDto);
  }

  @ApiOperation({
    summary: 'Delete a project by id',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProject(@Param() { id }: FindByIdParamsDto) {
    return this.projectService.findOneByIdAndDelete(id);
  }
}

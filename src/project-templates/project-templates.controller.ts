import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectTemplatesService } from './project-templates.service';
import {
  CreateProjectTemplateDto,
  UpdateProjectTemplateDto,
} from './dto/create-project-template.dto';

@Controller('project-templates')
export class ProjectTemplatesController {
  constructor(
    private readonly projectTemplatesService: ProjectTemplatesService,
  ) {}

  @Post()
  create(@Body() createProjectTemplateDto: CreateProjectTemplateDto) {
    return this.projectTemplatesService.create(createProjectTemplateDto);
  }

  @Get()
  findAll() {
    return this.projectTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectTemplateDto: UpdateProjectTemplateDto,
  ) {
    return this.projectTemplatesService.update(id, updateProjectTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectTemplatesService.remove(id);
  }
}

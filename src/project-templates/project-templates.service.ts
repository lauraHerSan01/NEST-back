import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTemplate } from './entities/project-template.entity';
import {
  CreateProjectTemplateDto,
  UpdateProjectTemplateDto,
} from './dto/create-project-template.dto';

@Injectable()
export class ProjectTemplatesService {
  constructor(
    @InjectRepository(ProjectTemplate)
    private projectTemplatesRepository: Repository<ProjectTemplate>,
  ) {}

  async create(
    createProjectTemplateDto: CreateProjectTemplateDto,
  ): Promise<ProjectTemplate> {
    const projectTemplate = this.projectTemplatesRepository.create(
      createProjectTemplateDto,
    );
    return this.projectTemplatesRepository.save(projectTemplate);
  }

  async findAll(): Promise<ProjectTemplate[]> {
    return this.projectTemplatesRepository.find();
  }

  async findOne(id: number): Promise<ProjectTemplate> {
    const projectTemplate = await this.projectTemplatesRepository.findOne({
      where: { id },
    });
    if (!projectTemplate) {
      throw new NotFoundException(`ProjectTemplate with ID ${id} not found`);
    }
    return projectTemplate;
  }

  async update(
    id: number,
    updateProjectTemplateDto: UpdateProjectTemplateDto,
  ): Promise<ProjectTemplate> {
    const projectTemplate = await this.findOne(id);
    Object.assign(projectTemplate, updateProjectTemplateDto);
    return this.projectTemplatesRepository.save(projectTemplate);
  }

  async remove(id: number): Promise<void> {
    const projectTemplate = await this.findOne(id);
    await this.projectTemplatesRepository.remove(projectTemplate);
  }
}

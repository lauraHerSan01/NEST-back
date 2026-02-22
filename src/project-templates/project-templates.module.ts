import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTemplatesService } from './project-templates.service';
import { ProjectTemplatesController } from './project-templates.controller';
import { ProjectTemplate } from './entities/project-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTemplate])],
  controllers: [ProjectTemplatesController],
  providers: [ProjectTemplatesService],
  exports: [ProjectTemplatesService],
})
export class ProjectTemplatesModule {}

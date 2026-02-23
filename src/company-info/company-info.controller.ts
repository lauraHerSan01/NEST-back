import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { CompanyInfoService } from './company-info.service';
import { CompanyInfo } from './entities/company-info.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserType } from '../users/entities/user.entity';

@Controller('company-info')
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  @Get()
  getInfo() {
    return this.companyInfoService.getInfo();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  update(@Body() data: Partial<CompanyInfo>) {
    return this.companyInfoService.update(data);
  }
}

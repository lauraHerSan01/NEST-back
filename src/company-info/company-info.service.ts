import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyInfo } from './entities/company-info.entity';

@Injectable()
export class CompanyInfoService {
  constructor(
    @InjectRepository(CompanyInfo)
    private companyInfoRepository: Repository<CompanyInfo>,
  ) {}

  async getInfo(): Promise<CompanyInfo> {
    let info = await this.companyInfoRepository.findOne({ where: { id: 1 } });
    if (!info) {
      info = this.companyInfoRepository.create({ id: 1 });
      await this.companyInfoRepository.save(info);
    }
    return info;
  }

  async update(data: Partial<CompanyInfo>): Promise<CompanyInfo> {
    const info = await this.getInfo();
    Object.assign(info, data);
    return this.companyInfoRepository.save(info);
  }
}

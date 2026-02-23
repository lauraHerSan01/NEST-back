import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { ProjectTemplatesModule } from './project-templates/project-templates.module';
import { CompanyInfoModule } from './company-info/company-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'habitar.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ConsultationsModule,
    AuthModule,
    ServicesModule,
    ProjectTemplatesModule,
    CompanyInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

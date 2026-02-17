import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@CurrentUser() user: any) {
    return this.usersService.findOne(user.id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  create(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      type?: UserType;
    },
  ) {
    return this.usersService.create(
      body.email,
      body.password,
      body.name,
      body.type,
    );
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { email?: string; name?: string; type?: UserType },
    @CurrentUser() user: any,
  ) {
    if (user.type !== UserType.ADMIN && user.id !== +id) {
      return this.usersService.update(+id, { name: body.name });
    }
    return this.usersService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

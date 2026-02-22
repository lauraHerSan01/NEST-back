import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType, User } from './entities/user.entity';
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
    @Body() body: Partial<User>,
    @CurrentUser() user: any,
  ) {
    if (user.type !== UserType.ADMIN && user.id !== +id) {
      const { email, type, ...allowedUpdates } = body;
      return this.usersService.update(+id, allowedUpdates);
    }
    return this.usersService.update(+id, body);
  }

  @Patch(':id/type')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  updateType(@Param('id') id: string, @Body() body: { type: UserType }) {
    return this.usersService.update(+id, { type: body.type });
  }

  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() body: { currentPassword: string; newPassword: string },
    @CurrentUser() user: any,
  ) {
    return this.usersService.updatePassword(
      +id,
      body.currentPassword,
      body.newPassword,
      user.id,
    );
  }

  @Get('team/all')
  getTeam() {
    return this.usersService.getTeam();
  }

  @Patch(':id/team')
  @UseGuards(RolesGuard)
  @Roles(UserType.ADMIN)
  setTeamMember(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.usersService.setTeamMember(+id, body);
  }
}

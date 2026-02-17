import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserType } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  register(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      type?: UserType;
    },
  ) {
    return this.authService.register(
      body.email,
      body.password,
      body.name,
      body.type,
    );
  }
}

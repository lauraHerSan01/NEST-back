import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserType } from '../users/entities/user.entity';

interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  secondLastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  type?: UserType;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}

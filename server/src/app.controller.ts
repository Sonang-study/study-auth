import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './users/dtos/loginUser.dto.ts';

@Controller()
export class AppController {
  constructor(private authService:AuthService){}

  @ApiBody({ type: [LoginUserDto] })
  @ApiOperation({ summary:'로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dtos/loginUser.dto.ts';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      { usernameField: 'email',
        passwordField: 'password'
      }
    );
  }

  async validate(email: string, password: string): Promise<any> {
    const userInfo = { email, password };
    const user = await this.authService.validateUser(userInfo);
    return user;
  }
}
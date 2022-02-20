import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    ){}

  async validateUser(userinfo): Promise<any> {
    const query = {
      where: {email: userinfo.email},
      select: ['email', 'firstName', 'lastName', 'password'],
    }
    const user = await this.usersService.getOne(query);
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      userinfo.password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.')
    }

    const { password, ...result } = user;
    return result;
  }

  
  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}

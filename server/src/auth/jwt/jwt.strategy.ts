import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UnAuthorizedError } from 'src/common/errors/unAuthorized.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User)
    private readonly users: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }
/*
Strategy실행되면 자동으로 validate 실행되기에 함수이름 변경하면 안됨
*/
  async validate(payload: any) {
    const email = payload.email;
    const user = await this.users.findOne({email});

    if (!user) throw new UnAuthorizedError();

    return payload;
  }
}

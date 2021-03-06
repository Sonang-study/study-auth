import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(userInfo): Promise<any> {
    const query = {
      where: { email: userInfo.email },
      select: ["id", "email", "firstName", "lastName", "password", "role"],
    };
    const user = await this.usersService.getOne(query);
    if (!user) {
      throw new UnauthorizedException("이메일과 비밀번호를 확인해주세요.");
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      userInfo.password,
      user.password
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException("이메일과 비밀번호를 확인해주세요.");
    }

    const { password, ...result } = user;
    return result;
  }

  async responseJWT(user: any) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

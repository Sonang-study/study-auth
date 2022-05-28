import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam} from "@nestjs/swagger";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/local/local-auth.guard";
import { CreateUserDto } from "./users/dtos/createUser.dto";
import { LoginUserDto } from "./users/dtos/loginUser.dto.ts";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiBody({ type: [LoginUserDto] })
  @ApiOperation({ summary: "로그인" })
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.responseJWT(req.user);
  }
  @ApiBody({ type: [CreateUserDto] })
  @ApiOperation({ summary: "회원가입" })
  @ApiBody({ type: CreateUserDto })
  @Post("auth/signup")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}

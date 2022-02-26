import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
/*
AuthGuard는 Strategy를 자동으로 실행
Strategy는 Validate 실행
*/

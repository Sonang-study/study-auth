import { OmitType, PickType } from '@nestjs/swagger';
import {User} from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'email',
  'password',
  'firstName',
  'lastName',
  'signupMethod',
  'role',
] as const) {}
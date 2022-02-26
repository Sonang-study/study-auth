import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext,): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
      /*
      * context.getHandler(), context.getClass() 두가지를 사용하는 이유는 decorator의 위치가 controller전체에, 각각 서비스에 기능을 미치게 하기 위해 사용
      * getAllAndOverride또한 위와 같은 용도로 사용
      */
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (user.role === 'admin') return true
    
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}

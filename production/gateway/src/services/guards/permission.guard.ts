import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<string[]>(
      'permission',
      context.getHandler(),
    );

    if (!permission) {
      return true;
    }

    
    /* 
      Uncomment to use the designated service
    
      const request = context.switchToHttp().getRequest();
      const permissionInfo = await firstValueFrom(
       this.permissionServiceClient.send(PERMISSION_SERVICE_ACTIONS_ENUM.CHECK_PERMISSION, {
         permission,
         user: request.user,
       }),
     );
    */

    const permissionInfo = {
      status: HttpStatus.OK,
      message: 'Permission granted',
    }

    if (!permissionInfo || permissionInfo.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: permissionInfo.message,
          data: null,
          errors: null,
        },
        permissionInfo.status,
      );
    }

    return true;
  }
}

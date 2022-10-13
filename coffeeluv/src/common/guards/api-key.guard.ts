import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configSrv: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    if (!authHeader.includes('Bearer')) {
      return false;
    }

    const incomingKey = authHeader.split(' ').at(-1);

    if (!incomingKey) {
      return false;
    }

    const private_key = this.configSrv.get<string>('API_KEY');

    if (incomingKey !== private_key) {
      return false;
    }

    return true;
  }
}

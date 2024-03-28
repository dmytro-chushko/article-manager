import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IJwtPayload } from 'src/types';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<IJwtPayload> => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);

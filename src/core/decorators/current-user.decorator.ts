import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// import { Socket } from 'socket.io';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>
        // ctx.getType() === 'http' ?
        ctx.switchToHttp().getRequest().user,
    // : ctx.switchToWs().getClient<Socket>().handshake.,
);

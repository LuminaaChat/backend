import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../../user/schemas/user.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
    public handleRequest(err: unknown, user: User): any {
        return user;
    }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        // @ts-ignore
        const { user }: Request = context.switchToHttp().getRequest();

        return user ? true : false;
    }
}

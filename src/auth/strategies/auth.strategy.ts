import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_KEY'),
            ignoreExpiration: true,
        });
    }

    protected async validate(payload: string) {
        const user = await this.helper.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

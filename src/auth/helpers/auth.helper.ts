import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthHelper {
    @InjectModel(User.name)
    private readonly repository: Model<User>;

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    // Decoding the JWT Token
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token, null);
    }

    // Get User by User ID we get from decode()
    public async validateUser(decoded: any): Promise<User> {
        return this.repository.findById({ _id: decoded.id });
    }

    // Generate JWT Token
    public generateToken(user: User): string {
        const payload = {
            id: user._id,
            email: user.email,
            roles: user.roles,
        };

        return this.jwt.sign(payload);
    }

    // Validate User's password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // Encode User's password
    public encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    private async validate(token: string): Promise<boolean | never> {
        const decoded: unknown = this.jwt.verify(token);

        if (!decoded) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const user: User = await this.validateUser(decoded);

        if (!user) {
            throw new UnauthorizedException();
        }

        return true;
    }
}

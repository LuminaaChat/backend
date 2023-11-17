import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { AuthHelper } from './helpers/auth.helper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {User} from "../user/schemas/user.schema";

@Injectable()
export class AuthService {
    @InjectModel(User.name)
    private readonly userModel: Model<User>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    constructor() {}

    public async register(body: RegisterDto): Promise<User | never> {
        const { firstName, lastName, roles, email, password }: RegisterDto = body;
        let user: User = await this.userModel.findOne({ where: { email } });

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new User();

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.roles = roles;
        user.emailVerified = false;
        user.lastLoginAt = null;
        user.expire = null;
        user.active = true;
        user.password = this.helper.encodePassword(password);

        return this.userModel.create(user);
    }

    public async login(
        body: LoginDto,
    ): Promise<{ token: string; user: User } | never> {
        const { email, password }: LoginDto = body;

        const user: User = await this.userModel
            .findOne({ email: email })
            .select('+password');

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid: boolean = this.helper.isPasswordValid(
            password,
            user.password,
        );

        if (!isPasswordValid) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        const lastLoginAt = new Date();
        this.userModel.updateOne({ _id: user._id }, { lastLoginAt: lastLoginAt });
        user.lastLoginAt = lastLoginAt;

        return {
            user: user,
            token: this.helper.generateToken(user),
        };
    }

    public async refresh(user: User): Promise<{ token: string; user: User }> {
        this.userModel.updateOne({ _id: user._id }, { lastLoginAt: new Date() });

        return {
            user: user,
            token: this.helper.generateToken(user),
        };
    }
}
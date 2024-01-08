import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';

import {AuthHelper} from './helpers/auth.helper';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {User} from '../user/schemas/user.schema';
import {PinRegisterDto} from "./dto/pin-register.dto";
import {PinVerifyDto} from "./dto/pin-verify.dto";

@Injectable()
export class AuthService {

    @Inject(AuthHelper)
    private readonly helper: AuthHelper

    @InjectModel(User.name)
    private readonly userModel: Model<User>

    constructor( ) {}

    public async register(body: RegisterDto): Promise<User | never> {
        try {

            const { firstName, lastName, roles, email, password }: RegisterDto = body;

            let user: User = await this.userModel.findOne({ where: { email } });

            if (user) {
                throw new HttpException('Conflict', HttpStatus.CONFLICT);
            }

            const newUser = new User();

            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.roles = roles;
            newUser.emailVerified = false;
            newUser.lastLoginAt = null;
            newUser.expire = null;
            newUser.active = true;
            newUser.password = this.helper.encodePassword(password);

            return await this.userModel.create(newUser);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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



        user.lastLoginAt = lastLoginAt;

        await this.userModel.updateOne(
            {_id: user._id},
            {lastLoginAt: lastLoginAt},
        ).exec();

        return {
            user: user,
            token: this.helper.generateToken(user),
        };
    }

    public async refresh(user: User): Promise<{ token: string; user: User }> {
        this.userModel.updateOne(
            { _id: user._id },
            { lastLoginAt: new Date() },
        );

        return {
            user: user,
            token: this.helper.generateToken(user),
        };
    }

    public async pinRegister(
        body: PinRegisterDto,
    ): Promise<boolean | never> {
        return false;
    }

    public async pinVerify(
        body: PinVerifyDto,
    ): Promise<boolean | never> {
        return false;
    }
}

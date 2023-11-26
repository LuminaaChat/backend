import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

    async create(createDto: CreateUserDto): Promise<User> {
        try {
            console.log(createDto);
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<User | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(): Promise<User[] | null> {
        try {
            return this.model.find();
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateUserDto): Promise<User> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}

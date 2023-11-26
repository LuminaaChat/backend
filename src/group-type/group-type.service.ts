import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {GroupType} from "./schemas/group-type.schema";
import {CreateGroupTypeDto} from "./dto/create-group-type.dto";
import {UpdateGroupTypeDto} from "./dto/update-group-type.dto";

@Injectable()
export class GroupTypeService {
    constructor(
        @InjectModel(GroupType.name) private readonly model: Model<GroupType>,
    ) {}

    async create(createDto: CreateGroupTypeDto): Promise<GroupType> {
        try {
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<GroupType | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(): Promise<GroupType[] | null> {
        try {
            return this.model.find();
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateGroupTypeDto): Promise<GroupType> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('GroupGroup Type not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Group Type not found', HttpStatus.NOT_FOUND);
        }
    }
}
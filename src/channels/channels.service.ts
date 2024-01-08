import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from './schemas/channel.schema';

@Injectable()
export class ChannelsService {
    constructor(
        @InjectModel(Channel.name) private readonly model: Model<Channel>,
    ) {}

    async create(
        divisionId: string,
        groupId: string,
        createDto: CreateChannelDto,
    ): Promise<Channel> {
        try {
            console.log('create');
            console.log('Division ID: ', divisionId);
            console.log('Group ID: ', groupId);
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<Channel | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(
        divisionId: string,
        groupId: string,
    ): Promise<Channel[] | null> {
        try {
            console.log('find all');
            console.log('Division ID: ', divisionId);
            console.log('Group ID: ', groupId);
            return this.model.find().populate('owners').populate('members');
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateChannelDto): Promise<Channel> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
        }
    }
}

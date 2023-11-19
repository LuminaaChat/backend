import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {GroupChat} from "./schemas/group-chat.schema";
import {CreateGroupChatDto} from "./dto/create-group-chat.dto";
import {UpdateGroupChatDto} from "./dto/update-group-chat.dto";

@Injectable()
export class GroupChatsService {
  constructor(
      @InjectModel(GroupChat.name) private readonly model: Model<GroupChat>,
  ) {}

  async create(createDto: CreateGroupChatDto): Promise<GroupChat> {
    try {
      return await this.model.create(createDto);
    } catch (error) {
      throw new HttpException('Conflict!', HttpStatus.CONFLICT);
    }
  }

  async findOne(id: string): Promise<GroupChat | null> {
    try {
      return this.model.findOne({ _id: id });
    } catch (error) {
      throw new HttpException('GroupChat not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<GroupChat[] | null> {
    try {
      return this.model.find().populate('owners').populate('members');
    } catch (error) {
      throw new HttpException(
          'Something dont work',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateDto: UpdateGroupChatDto): Promise<GroupChat> {
    try {
      await this.model.updateOne({ _id: id }, updateDto);
      return await this.model.findOne({ id });
    } catch (error) {
      throw new HttpException('GroupChat not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('GroupChat not found', HttpStatus.NOT_FOUND);
    }
  }
}
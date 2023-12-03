import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Group} from "./schemas/group.schema";
import {UpdateGroupDto} from "./dto/update-group.dto";
import {CreateGroupDto} from "./dto/create-group.dto";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class GroupsService {
  constructor(
      private eventEmitter: EventEmitter2,
      @InjectModel(Group.name) private readonly model: Model<Group>,
  ) {}

  async create(createDto: CreateGroupDto): Promise<Group> {
    try {
      const group = await this.model.create(createDto);
      const event = {
        divisionId: group.division._id,
        groupId: group._id,
      }
      this.eventEmitter.emit('group.created', event);
      return group;
    } catch (error) {
      throw new HttpException('Conflict!', HttpStatus.CONFLICT);
    }
  }

  async findOne(id: string): Promise<Group | null> {
    try {
      return this.model.findOne({ _id: id });
    } catch (error) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Group[] | null> {
    try {
      return this.model.find().populate('owners').populate('members');
    } catch (error) {
      throw new HttpException(
          'Something dont work',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateDto: UpdateGroupDto): Promise<Group> {
    try {
      await this.model.updateOne({ _id: id }, updateDto);
      return await this.model.findOne({ id });
    } catch (error) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
  }
}
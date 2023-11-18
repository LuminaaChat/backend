import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Room} from "./schemas/room.schema";
import {UpdateRoomDto} from "./dto/update-room.dto";
import {CreateRoomDto} from "./dto/create-room.dto";

@Injectable()
export class RoomsService {
  constructor(
      @InjectModel(Room.name) private readonly model: Model<Room>,
  ) {}

  async create(createDto: CreateRoomDto): Promise<Room> {
    try {
      return await this.model.create(createDto);
    } catch (error) {
      throw new HttpException('Conflict!', HttpStatus.CONFLICT);
    }
  }

  async findOne(id: string): Promise<Room | null> {
    try {
      return this.model.findOne({ _id: id });
    } catch (error) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Room[] | null> {
    try {
      return this.model.find().populate('owners').populate('members');
    } catch (error) {
      throw new HttpException(
          'Something dont work',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateDto: UpdateRoomDto): Promise<Room> {
    try {
      await this.model.updateOne({ _id: id }, updateDto);
      return await this.model.findOne({ id });
    } catch (error) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
  }
}
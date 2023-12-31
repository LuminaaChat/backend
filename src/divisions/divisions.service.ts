import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Division} from "./schemas/division.schema";
import {EventEmitter2} from "@nestjs/event-emitter";

@Injectable()
export class DivisionsService {
  constructor(
      private eventEmitter: EventEmitter2,
      @InjectModel(Division.name) private readonly model: Model<Division>,
  ) {}

  async create(createDto: CreateDivisionDto): Promise<Division> {
    try {

      const division = await this.model.create(createDto);
      this.eventEmitter.emit('division.created', division._id);

      return division;
    } catch (error) {
      throw new HttpException('Conflict!', HttpStatus.CONFLICT);
    }
  }

  async createComputed(createDto: CreateDivisionDto): Promise<Division> {
    try {
      return await this.model.create(createDto);
    } catch (error) {
      throw new HttpException('Conflict!', HttpStatus.CONFLICT);
    }
  }

  async findOne(id: string): Promise<Division | null> {
    try {
      return this.model.findOne({ _id: id });
    } catch (error) {
      throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<Division[] | null> {
    try {
      return this.model.find().populate('owners').populate('members').populate('groups');
    } catch (error) {
      throw new HttpException(
          'Something dont work',
          HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateDto: UpdateDivisionDto): Promise<Division> {
    try {
      await this.model.updateOne({ _id: id }, updateDto);
      return await this.model.findOne({ id });
    } catch (error) {
      throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('Division not found', HttpStatus.NOT_FOUND);
    }
  }
}

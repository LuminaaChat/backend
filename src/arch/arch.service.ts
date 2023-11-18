import { Injectable } from '@nestjs/common';
import { CreateArchDto } from './dto/create-arch.dto';
import { UpdateArchDto } from './dto/update-arch.dto';

@Injectable()
export class ArchService {
    create(createArchDto: CreateArchDto) {
        return 'This action adds a new arch';
    }

    findAll() {
        return `This action returns all arch`;
    }

    findOne(id: number) {
        return `This action returns a #${id} arch`;
    }

    update(id: number, updateArchDto: UpdateArchDto) {
        return `This action updates a #${id} arch`;
    }

    remove(id: number) {
        return `This action removes a #${id} arch`;
    }
}

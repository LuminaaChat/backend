import { Module } from '@nestjs/common';
import { ArchService } from './arch.service';
import { ArchController } from './arch.controller';

@Module({
    controllers: [ArchController],
    providers: [ArchService],
})
export class ArchModule {}

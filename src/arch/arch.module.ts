import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageArch, MessageArchSchema } from './schemas/arch.schema';
import { ArchService } from './arch.service';
import { ArchController } from './arch.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MessageArch.name, schema: MessageArchSchema },
        ]),
    ],
    controllers: [ArchController],
    providers: [ArchService],
})
export class MessageArchModule {}

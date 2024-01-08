import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly model: Model<Message>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async create(createDto: CreateMessageDto): Promise<Message> {
        try {
            return await this.model.create(createDto);
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async findOne(id: string): Promise<Message | null> {
        try {
            return this.model.findOne({ _id: id });
        } catch (error) {
            throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAll(
        senderId?: string,
        receiverId?: string,
    ): Promise<Message[] | null> {
        try {
            if (senderId && receiverId) {
                const result1: Message[] = await this.model
                    .find({ sender: senderId, receiver: receiverId })
                    .populate('sender')
                    .populate('receiver');

                const result2: Message[] = await this.model
                    .find({ sender: receiverId, receiver: senderId })
                    .populate('sender')
                    .populate('receiver');

                return [...result1, ...result2].sort((a, b) => {
                    return a.createdAt.getTime() - b.createdAt.getTime();
                });
            }

            if (senderId) {
                return this.model
                    .find({ sender: senderId })
                    .sort({ createdAt: 'asc' })
                    .populate('sender')
                    .populate('receiver');
            }

            if (receiverId) {
                return this.model
                    .find({ receiver: receiverId })
                    .sort({ createdAt: 'asc' })
                    .populate('sender')
                    .populate('receiver');
            }

            return this.model
                .find()
                .sort({ createdAt: 'asc' })
                .populate('sender')
                .populate('receiver');
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: string, updateDto: UpdateMessageDto): Promise<Message> {
        try {
            await this.model.updateOne({ _id: id }, updateDto);
            return await this.model.findOne({ id });
        } catch (error) {
            throw new HttpException('Config not found', HttpStatus.NOT_FOUND);
        }
    }

    async remove(id: string): Promise<void> {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new HttpException('Config not found', HttpStatus.NOT_FOUND);
        }
    }

    async findAllByRequesterId(requesterId: string): Promise<User[] | null> {
        try {
            const result1: Message[] = await this.model
                .find({ sender: requesterId })
                .populate('sender')
                .populate('receiver');

            const result2: Message[] = await this.model
                .find({ receiver: requesterId })
                .populate('sender')
                .populate('receiver');

            const messages = [...result1, ...result2];
            const chats = [];

            messages.forEach((message) => {
                if (message.sender._id != requesterId) {
                    if (!chats.includes(message.sender._id)) {
                        chats.push(message.sender._id);
                    }
                }
            });

            const users = [];

            for (const userId of chats) {
                const user: User = await this.userModel
                    .findOne({ _id: userId })
                    .exec();
                users.push({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                });
            }

            return users;
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAllBychatId(chatId: string): Promise<Message[] | null> {
        try {
            return await this.model
                .find({ chat: chatId })
                .populate('sender')
                .populate('receiver');
        } catch (error) {
            throw new HttpException(
                'Something dont work',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

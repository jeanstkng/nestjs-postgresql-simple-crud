import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {

    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {}

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async createMessage(newMessage: CreateMessageDto): Promise<Message> {
        const createdMessage = new Message();
        createdMessage.name = newMessage.name;
        createdMessage.content = newMessage.content;

        return this.messageRepository.save(createdMessage);
    }

    async updateMessage(idMessage: number, updateMessage: CreateMessageDto): Promise<Message> {
        const updatedMessage = await this.messageRepository.findOne(idMessage);
        updatedMessage.name = updateMessage.name;
        updatedMessage.content = updateMessage.content;

        return this.messageRepository.save(updatedMessage);
    }

    async deleteMessage(idMessage: number): Promise<any> {
        return await this.messageRepository.delete(idMessage);
    }

}

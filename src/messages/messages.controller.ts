import { Controller, Get, Body, Post, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messagesService: MessagesService) {}

    @Post()
    create (@Body() createMessageDto: CreateMessageDto, @Res() response) {
        this.messagesService.createMessage(createMessageDto).then(
            message => {
                response.status(HttpStatus.CREATED).json(message);
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({msg: 'Error while creating message'})
            }
        );
    }

    @Get()
    getAll (@Res() response) {
        this.messagesService.getAll().then(
            messagesList => {
                response.status(HttpStatus.OK).json(messagesList);
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({msg: 'Error while getting messages'})
            }
        );
    }

    @Put(':id')
    update (@Body() updateMessageDto: CreateMessageDto, @Res() response, @Param('id') idMessage) {
        this.messagesService.updateMessage(idMessage, updateMessageDto).then(
            messageUpdated => {
                response.status(HttpStatus.OK).json(messageUpdated);
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({msg: 'Error while updating message'})
            }
        );
    }

    @Delete(':id')
    delete (@Res() response, @Param('id') idMessage) {
        this.messagesService.deleteMessage(idMessage).then(
            deletedMessage => {
                response.status(HttpStatus.OK).json(deletedMessage);
            }
        ).catch(
            () => {
                response.status(HttpStatus.FORBIDDEN).json({msg: 'Error while deleting message'})
            }
        );
    }

}

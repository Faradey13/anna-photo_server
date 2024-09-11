import { Body, Controller, Post } from "@nestjs/common";
import axios from 'axios';
import { TelegramService } from "./telegram.service";

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('/send_message')
  async handleUpdate(@Body() body: { name: string; phone: string; message: string }): Promise<void> {


    console.log(`Received message  ${body}`);


    await this.telegramService.sendMessage(body);
  }
}


import { Body, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class TelegramService {
  private readonly telegramToken = '7507176457:AAGYYAVd3gc3cyNByxvp5z15MMiSOKxinHA'; // Замените на ваш токен
  private readonly chatId = '475031820'; // Замените на ваш ID чата или канала

  async sendMessage (body: {name: string; phone: string; message: string }): Promise<any> {
    const { name, phone, message } = body;
    const text = `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;

    try {
      await axios.post(`https://api.telegram.org/bot${this.telegramToken}/sendMessage`, {
        chat_id: this.chatId,
        text: text,
      });
      return { status: 'success', message: 'Message sent!' };
    } catch (error) {
      console.error('Error sending message:', error);
      return { status: 'error', message: 'Error sending message' };
    }
  }
}

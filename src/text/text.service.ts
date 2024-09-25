import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Text } from "./text.model";
import { TextDto } from "./text.dto";

@Injectable()
export class TextService {
  constructor(
    @InjectModel(Text)
    private readonly textModel: typeof Text
  ) {
  }

  async getTextByType(type: string): Promise<[Text[], Text[]]> {
    const ruText = await this.textModel.findAll({
      where: { type: type, lang: "ru" }, order: [
        ["id", "ASC"]
      ]
    });
    const enText = await this.textModel.findAll({
      where: { type: type, lang: "en" }, order: [
        ["id", "ASC"]
      ]
    });

    return [ruText, enText];
  }

  

  async editTextById(dto: TextDto): Promise<{
    message: string,
    result: { ruResult: [affectedRows: number], enResult: [affectedRows: number] }
  }> {


    try {
      const ruResult = await this.textModel.update(
        { text: dto.ru },
        { where: { id: dto.idRu, lang: "ru" } }
      );


      const enResult = await this.textModel.update(
        { text: dto.en },
        { where: { id: dto.idEn, lang: "en" } }
      );

      return { message: "Texts updated successfully", result: { ruResult, enResult } };
    } catch (e) {
      throw new HttpException("Error editing text", HttpStatus.NOT_FOUND);
    }
  }


  async createNewText(dto: TextDto): Promise<{ message: string, result: { ruResult: Text, enResult: Text } }> {
    console.log(dto);
    try {
      const ruResult = await this.textModel.create({
        key: dto.keyUniq,
        lang: "ru",
        text: dto.ru,
        type: dto.type
      });
      console.log(ruResult);

      const enResult = await this.textModel.create({
        key: dto.keyUniq,
        lang: "en",
        text: dto.en,
        type: dto.type
      });
      console.log(enResult);

      return { message: "Texts created successfully", result: { ruResult, enResult } };
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }

  async destroyTextByType(dto: TextDto): Promise<{ message: string }> {
    try {
      await this.textModel.destroy({ where: { type: dto.type } });
      return { message: "Texts deleted successfully" };
    } catch (e) {
      throw new HttpException("Error deleting text", HttpStatus.NOT_FOUND);
    }
  }

  async destroyTextById(dto: TextDto): Promise<{ message: string, result: number }> {
    console.log(dto);
    try {
      const ruResult = await this.textModel.destroy({ where: { id: dto.id } });

      return { message: "Texts deleted successfully", result: ruResult };
    } catch (e) {
      throw new HttpException("Error deleting text", HttpStatus.NOT_FOUND);
    }
  }

}

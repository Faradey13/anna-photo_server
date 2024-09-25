import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { TextService } from "./text.service";
import { TextDto } from "./text.dto";
import { Text } from "./text.model";
import { JwtAuthGuard } from "../guards/JwtAuthGuard";

@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async Create(@Body()dto: TextDto){
    return this.textService.createNewText({
      type: dto.type, en: dto.en, ru: dto.ru, keyUniq: dto.keyUniq })
  }
  @UseGuards(JwtAuthGuard)
  @Post('/edit')
  async Edit(@Body() dto: TextDto){
    console.log(dto);
    return this.textService.editTextById({
      ru: dto.ru, en: dto.en,  idRu: dto.idRu, idEn: dto.idEn })
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async Delete(@Body() dto: TextDto){
    console.log(dto)
    return this.textService.destroyTextById({ id: dto.id})
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/deletetype')
  async DeleteType(@Body() dto: TextDto){
    return this.textService.destroyTextByType({type: dto.type})
  }
  @Get(':type')
    async GetText(@Param('type') type: string): Promise<[Text[], Text[]]> {
      return this.textService.getTextByType(type)
    }



}


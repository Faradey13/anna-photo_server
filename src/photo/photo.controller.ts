import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { extname } from 'path';
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Photo } from "./photo.model";
import { PhotoService } from "./photo.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../guards/JwtAuthGuard";


@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload/:type')
  @UseInterceptors(FilesInterceptor('files', 300))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Param('type') type: string): Promise<Photo[]> {
    console.log('начало запроса')
    console.log(files)
    return this.photoService.createFiles(files, type);
  }

  @Get(':type')
  async getFilesByType(@Param('type') type: string): Promise<Photo[]> {
    return this.photoService.getImagesByType(type);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/replace')
  @UseInterceptors(FileInterceptor('image'))
  async replaceImage(

    @Body('name_s') name_s: string,
    @UploadedFile() image: Express.Multer.File
  ) {
    console.log(name_s)
    console.log(image)
    const baseName = name_s.split('.')[0]
    try {

      await this.photoService.deleteImageByName(baseName, 'main');
    } catch (error) {

      console.error(`Error deleting image: ${error.message}`);
    }


    const fileExtension = extname(image.originalname);
    const newFileName = `${baseName}${fileExtension}`;
    image.originalname = newFileName;

    return await this.photoService.createFiles([image], 'main')
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:name_s')
  async deleteImage(@Param('name_s') name_s: string, @Body('type') type: string): Promise<string> {
    console.log(`имя.....${name_s}, тип.....${type}`)

    try {
      const baseName = name_s.split('.')[0]
      await this.photoService.deleteImageByName(baseName, type)
       return 'изображение удалено'
      }
    catch (e){
      console.log('что то не так')
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
  }
}

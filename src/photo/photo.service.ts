import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import * as fs from 'fs';
import { Photo } from "./photo.model";
import { join } from "path";
import { unlink } from 'fs/promises';



@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo)
    private readonly photoModel: typeof Photo,
  ) {}

  async createFiles(files: Express.Multer.File[] , type: string): Promise<Photo[]> {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const uploadedFiles: Photo[] = [];


    console.log('Received files:', files);
    console.log('Received type:', type);


    const filePath = path.resolve(__dirname, '..', 'static', 'images', type);
    if (!fs.existsSync(filePath)) {
      console.log(`Directory does not exist. Creating: ${filePath}`);
      fs.mkdirSync(filePath, { recursive: true });
    } else {
      console.log('Directory already exists:', filePath);
    }

    for (const file of files) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      console.log(`Checking file: ${file.originalname} with extension ${fileExtension}`);

      if (!allowedExtensions.includes(fileExtension)) {
        console.error(`Unsupported file type: ${file.originalname}`);
        throw new HttpException(`Unsupported file type: ${file.originalname}`, HttpStatus.BAD_REQUEST);
      }

      const isSmall = file.originalname.includes('_s');
      const isLarge = file.originalname.includes('_l');
      const commonName = file.originalname.split('_')[0];

      let imageEntity = await this.photoModel.findOne({ where: { commonName: commonName, type: type } });

      if (imageEntity) {
        console.log(`Found existing entity for common name: ${commonName} and type: ${type}`);

        if (isSmall) {
          const smallFilePath = path.join(filePath, file.originalname);
          console.log(`Saving small image to: ${smallFilePath}`);
          await fs.promises.writeFile(smallFilePath, file.buffer);
          console.log(`Saved small image: ${file.originalname}`);

          imageEntity.name_s = file.originalname;
          imageEntity.path_s = `/images/${type}/${file.originalname}`;
        }

        if (isLarge) {
          const largeFilePath = path.join(filePath, file.originalname);
          console.log(`Saving large image to: ${largeFilePath}`);
          await fs.promises.writeFile(largeFilePath, file.buffer);
          console.log(`Saved large image: ${file.originalname}`);

          imageEntity.name_l = file.originalname;
          imageEntity.path_l = `/images/${type}/${file.originalname}`;
        }


        await imageEntity.save();
        console.log(`Updated entity: ${commonName}`);
      } else {
        console.log(`No existing entity found. Creating new entity for common name: ${commonName} and type: ${type}`);

        const newImage: Partial<Photo> = {
          commonName,
          type,
        };

        if (isSmall) {
          const smallFilePath = path.join(filePath, file.originalname);
          console.log(`Saving small image to: ${smallFilePath}`);
          await fs.promises.writeFile(smallFilePath, file.buffer);
          console.log(`Saved small image: ${file.originalname}`);

          newImage.name_s = file.originalname;
          newImage.path_s = `/images/${type}/${file.originalname}`;
        }

        if (isLarge) {
          const largeFilePath = path.join(filePath, file.originalname);
          console.log(`Saving large image to: ${largeFilePath}`);
          await fs.promises.writeFile(largeFilePath, file.buffer);
          console.log(`Saved large image: ${file.originalname}`);

          newImage.name_l = file.originalname;
          newImage.path_l = `/images/${type}/${file.originalname}`;
        }

        imageEntity = await this.photoModel.create(newImage);
        console.log(`Created new entity: ${commonName}`);
      }

      uploadedFiles.push(imageEntity);
    }

    return uploadedFiles;

  }

  async getImagesByType(type: string): Promise<Photo[]> {
    return this.photoModel.findAll({ where: { type } });
  }


  async deleteImageByName(name_s: string, type: string): Promise<void> {

    const name = name_s.slice(0, -2)
    const imageEntity = await this.photoModel.findOne({ where: { commonName: name } });
    console.log(imageEntity)
    if (!imageEntity) {
      console.log('нет фотки')
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);

    }


    try {
      if(imageEntity.name_s){
      const filePath_s = join(__dirname, '..',  'static', 'images', type, imageEntity.name_s);
      try {
        await unlink(filePath_s);
        console.log('файл удален')
      } catch (error) {
        console.error(`Ошибка при удалении файла: ${error.message}`);
      }}
      if(imageEntity.name_l){
        const filePath_l = join(__dirname, '..',  'static', 'images', type, imageEntity.name_l);
        try {
          await unlink(filePath_l);
          console.log('файл удален')
        } catch (error) {
          console.error(`Ошибка при удалении файла: ${error.message}`);
        }}
    } catch (err) {
      throw new HttpException(`Error deleting files: ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    await this.photoModel.destroy({ where: { id: imageEntity.id } });
    console.log(`Deleted image from ${imageEntity.id}`);
  }
}


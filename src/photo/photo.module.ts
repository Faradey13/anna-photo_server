import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from "./photo.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Photo])],
  providers: [PhotoService],
  controllers: [PhotoController],


})
export class PhotoModule {}

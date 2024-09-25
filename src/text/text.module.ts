import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Text } from "./text.model";

@Module({
  imports: [SequelizeModule.forFeature([Text])],
  providers: [TextService],
  controllers: [TextController]
})
export class TextModule {}

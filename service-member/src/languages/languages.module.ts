import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Languages } from './entities/language.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Languages])],
  controllers: [LanguagesController],
  providers: [LanguagesService]
})
export class LanguagesModule {}

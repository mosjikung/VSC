import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodFeelingValuesService } from './mood_feeling_values.service';
import { MoodFeelingValuesController } from './mood_feeling_values.controller';
import { MoodFeelingValue } from './entities/mood_feeling_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoodFeelingValue])], // ต้องรวม Entity ที่ต้องการ
  controllers: [MoodFeelingValuesController],
  providers: [MoodFeelingValuesService]
})
export class MoodFeelingValuesModule {}

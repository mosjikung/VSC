import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Districts } from './entities/district.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Districts])
  ],
  controllers: [DistrictsController],
  providers: [DistrictsService]
})
export class DistrictsModule {}

import { Module } from '@nestjs/common';
import { SubdistrictsService } from './subdistricts.service';
import { SubdistrictsController } from './subdistricts.controller';
import { Subdistricts } from './entities/subdistrict.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Subdistricts])],
  controllers: [SubdistrictsController],
  providers: [SubdistrictsService]
})
export class SubdistrictsModule {}

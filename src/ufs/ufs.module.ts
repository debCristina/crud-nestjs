import { Module } from '@nestjs/common';
import { UfsService } from './ufs.service';
import { UfsController } from './ufs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uf } from './entities/uf.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Uf])],
  controllers: [UfsController],
  providers: [UfsService],
  exports: [TypeOrmModule]
})
export class UfsModule {}

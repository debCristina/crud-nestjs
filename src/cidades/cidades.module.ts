import { Module } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CidadesController } from './cidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidade } from './entities/cidade.entity';
import { UfsModule } from 'src/ufs/ufs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade]),
  UfsModule],
  controllers: [CidadesController],
  providers: [CidadesService],
  exports: [TypeOrmModule],
})
export class CidadesModule {}

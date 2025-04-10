import { Module } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { EstudantesController } from './estudantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudante } from './entities/estudante.entity';
import { CidadesModule } from 'src/cidades/cidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([Estudante]), CidadesModule],
  controllers: [EstudantesController],
  providers: [EstudantesService],
  
})
export class EstudantesModule {}

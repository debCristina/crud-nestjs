import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudantesModule } from './estudantes/estudantes.module';
import { CidadesModule } from './cidades/cidades.module';
import { UfsModule } from './ufs/ufs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'de.sqlite',
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
  EstudantesModule, CidadesModule, UfsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {}
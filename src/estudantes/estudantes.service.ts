import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';
import { EntitySchema, Repository } from 'typeorm';
import { Estudante } from './entities/estudante.entity';
import { Cidade } from 'src/cidades/entities/cidade.entity';
import { dot } from 'node:test/reporters';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class EstudantesService {
  constructor(
    @InjectRepository(Estudante)
    private readonly estudanterepository: Repository<Estudante>,

    @InjectRepository(Cidade) 
    private readonly cidaderepository: Repository<Cidade>
    ){}
     

  async create(createEstudanteDto: CreateEstudanteDto) {
    const cidade = await this.cidaderepository.findOne({where: {id: createEstudanteDto.cidade_id}})

    if(!cidade){
      throw new NotFoundException('Cidade não encontrada no banco de dados');
    }

    const estudante = this.estudanterepository.create({
      ...createEstudanteDto,
      cidade

    }

    );
    return this.estudanterepository.save(estudante);
  }

  findAll() {
    return this.estudanterepository.find({relations: ['cidade']},

    );
  }

  findOne(id: number) {
    return this.estudanterepository.findOneBy({id});
  }

  async update(id: number, updateEstudanteDto: UpdateEstudanteDto) {
    const estudante = await this.estudanterepository.findOneBy({id});

    if(!estudante) return null;

    this.estudanterepository.merge(estudante, updateEstudanteDto);
    return this.estudanterepository.save(estudante);
    
  }

  async remove(id: number) {
    const estudante = await this.estudanterepository.findOneBy({id});

    if(!estudante) return null;

    return this.estudanterepository.remove(estudante);  
  }
}
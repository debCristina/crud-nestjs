import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { Uf } from 'src/ufs/entities/uf.entity';
@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(Cidade)
    private readonly cidaderepository: Repository<Cidade>,

    @InjectRepository(Uf)
    private readonly ufrepository: Repository<Uf>
  ){}

  async create(createCidadeDto: CreateCidadeDto) {
  const uf = await this.ufrepository.findOne({where: {id: createCidadeDto.uf_id}})

    if(!uf){
      throw new NotFoundException('Uf não encontrada no banco de dados');
    }

    const cidade = this.cidaderepository.create({...createCidadeDto,uf});
    return this.cidaderepository.save(cidade); 
  }

  findAll() {
    return this.cidaderepository.find({relations:['uf']});
  }

  findOne(id: number) {
    return this.cidaderepository.findOneBy({id});
  }

  async findStudents(cidade_id: number) {
    return this.cidaderepository.findOne({where :{id: cidade_id}, relations: ['estudantes']});
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto) {
    const cidade = await this.cidaderepository.findOneBy({id});

    if(!cidade) return null;

    this.cidaderepository.merge(cidade, updateCidadeDto);
    return this.cidaderepository.save(cidade);
    }

  async remove(id: number) {
    const cidade = await this.cidaderepository.findOneBy({id});

    if(!cidade) return null;

    return this.cidaderepository.remove(cidade);
  }
}

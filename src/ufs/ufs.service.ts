import { Inject, Injectable } from '@nestjs/common';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';
import { Repository } from 'typeorm';
import { Uf } from './entities/uf.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UfsService {
  constructor(
    @InjectRepository(Uf)
    private readonly ufrepository: Repository<Uf>
  ){}

  create(createUfDto: CreateUfDto) {
    const uf = this.ufrepository.create(createUfDto);
    return this.ufrepository.save(uf);
  }

  findAll() {
    return this.ufrepository.find();
  }

  findOne(id: number) {
    return this.ufrepository.findOneBy({id});
  }

  async findCitys(uf_id: number) {
    return this.ufrepository.findOne({where :{id: uf_id}, relations: ['cidades']});
  }

  async update(id: number, updateUfDto: UpdateUfDto) {
    const uf = await this.ufrepository.findOneBy({id});

    if(!uf) return null;

    this.ufrepository.merge(uf, updateUfDto);
    return this.ufrepository.save(uf);
  }

  

  async remove(id: number) {
    const estudante = await this.ufrepository.findOneBy({id});

    if(!estudante) return null;

    return this.ufrepository.remove(estudante);   
  }
}

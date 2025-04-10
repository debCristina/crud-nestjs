import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { EstudantesService } from './estudantes.service';
import { CreateEstudanteDto } from './dto/create-estudante.dto';
import { UpdateEstudanteDto } from './dto/update-estudante.dto';

@Controller('estudantes')
export class EstudantesController {
  constructor(private readonly estudantesService: EstudantesService) {}

  @Post()
  create(@Body() createEstudanteDto: CreateEstudanteDto) {
    return this.estudantesService.create(createEstudanteDto);
  }

  @Get()
  findAll() {
    return this.estudantesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const estudante = await this.estudantesService.remove(+id);
    if(!estudante) throw new NotFoundException();  
    return estudante;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEstudanteDto: UpdateEstudanteDto) {
    const estudante = await this.estudantesService.remove(+id);
    if(!estudante) throw new NotFoundException();  
    return estudante;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const estudante = await this.estudantesService.remove(+id);
    if(!estudante) throw new NotFoundException();
  }
}

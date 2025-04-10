import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UfsService } from './ufs.service';
import { CreateUfDto } from './dto/create-uf.dto';
import { UpdateUfDto } from './dto/update-uf.dto';

@Controller('ufs')
export class UfsController {
  constructor(private readonly ufsService: UfsService) {}

  @Post()
  create(@Body() createUfDto: CreateUfDto) {
    return this.ufsService.create(createUfDto);
  }

  @Get()
  findAll() {
    return this.ufsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const uf = await this.ufsService.findOne(+id);
    if(!uf) throw new NotFoundException();  
    return uf;  
  }

  @Get(':id/cidades')
  async findCityFromUF(@Param('id') id: string) {
    const uf = await this.ufsService.findCitys(+id);
    if(!uf) throw new NotFoundException();
    return uf;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUfDto: UpdateUfDto) {
    const uf = await this.ufsService.update(+id, updateUfDto);
    if(!uf) throw new NotFoundException();  
    return uf;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const uf = await this.ufsService.remove(+id);
    if(!uf) throw new NotFoundException();  
    return this.ufsService;  
  }
}

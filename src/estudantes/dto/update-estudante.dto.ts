import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudanteDto } from './create-estudante.dto';

export class UpdateEstudanteDto extends PartialType(CreateEstudanteDto) {}

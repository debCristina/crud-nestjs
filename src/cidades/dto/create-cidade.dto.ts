import { IsInt, IsString } from "class-validator";

export class CreateCidadeDto {
    @IsString()
    nome: string;
    
    @IsInt()
    uf_id: number;
}

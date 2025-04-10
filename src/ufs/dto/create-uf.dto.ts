import { IsString, Length, Matches } from "class-validator";

export class CreateUfDto {
    @IsString()
    nome: string;
    
    @IsString()
    @Matches(/^[A-Z]{2}$/, {
        message: 'A sigla deve conter 2 letras',
    })
    sigla: string;
}

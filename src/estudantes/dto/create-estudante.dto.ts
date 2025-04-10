import { IsDateString, IsEmail, IsInt, IsNumber, IsString, Matches } from "class-validator";

export class CreateEstudanteDto {
     
    @IsString()
    nome: string;
    
    @IsString()
    @Matches(/^[A-Z]{2}[0-9]{8}$/, {
        message: 'A matrícula deve conter 2 letras seguidas de 8 números'
    })
    matricula: string;
    
    @IsEmail()
    email: string;
    
    @IsDateString()
    dt_nascimento: string;
    
    @IsInt()
    cidade_id: number; 
    
}

import { Cidade } from "src/cidades/entities/cidade.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('estudantes')
export class Estudante {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    nome: string;

    @Column()
    matricula: string;

    @Column()
    email: string;

    @Column()
    dt_nascimento: string;

    @ManyToOne(() => Cidade, (cidade) => cidade.estudantes)
    @JoinColumn({name: 'cidade_id'})
    cidade: Cidade; 
}

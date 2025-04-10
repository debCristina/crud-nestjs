import { Cidade } from "src/cidades/entities/cidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ufs')
export class Uf {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sigla: string;

    @OneToMany(() => Cidade, (cidade) => cidade.uf)
    cidades: Cidade[];
}

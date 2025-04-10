import { Estudante } from "src/estudantes/entities/estudante.entity";
import { Uf } from "src/ufs/entities/uf.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('cidades')
export class Cidade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToMany(() => Estudante, (estudante) => estudante.cidade)
    estudantes: Estudante[]

    @ManyToOne(() => Uf, (uf) => uf.cidades)
    @JoinColumn({name: 'uf_id'})
    uf: Uf;
}
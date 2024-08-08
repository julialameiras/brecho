import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()  
    id: number
    
    @Transform(({ value }: TransformFnParams) => value?.trim ())
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 5, nullable: false})
    tamanho: string

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2 })
    preco: number

    @Column()
    foto: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

}
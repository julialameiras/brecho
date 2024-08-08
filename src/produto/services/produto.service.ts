import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService{
  constructor(
    @InjectRepository(Produto) 
      private produtoRepository: Repository<Produto>,
    ) {}

  async findAll(): Promise<Produto[]> { 
    return await this.produtoRepository.find({
     relations:{
      categoria: true,
    }
  }); 
}

  async findById(id: number): Promise<Produto> {
    let buscaProduto = await this.produtoRepository.findOne({          
          where: {
            id,
          },
          relations: {
            categoria:true
          },
  });
  if (!Produto)
    throw new HttpException(
      'Produto não encontrado!',
        HttpStatus.NOT_FOUND,
      );
      return buscaProduto;
}

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({          
      where: {
        nome: ILike(`%${nome}%`),
        },
        relations: {
          categoria:true,
        },
  });
}

   async create(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
}

  async update(produto: Produto): Promise<Produto> {
    let buscaProduto = await this.findById(produto.id);
    if (!buscaProduto || !produto.id)
      throw new HttpException(
      'O Produto não foi encontrado!', 
      HttpStatus.NOT_FOUND
    );
    return await this.produtoRepository.save(produto);
}
  async delete(id:number): Promise<DeleteResult>{
    let buscaCategoria = await this.findById(id);
    if(!buscaCategoria)
      throw new HttpException(
      'A Categoria não foi encontrada', 
      HttpStatus.NOT_FOUND
    );
    return await this.produtoRepository.delete(id);
  }
}

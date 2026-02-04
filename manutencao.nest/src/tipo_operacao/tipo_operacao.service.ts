import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoOperacaoDto } from './dto/create-tipo_operacao.dto';
import { UpdateTipoOperacaoDto } from './dto/update-tipo_operacao.dto';
import { TipoOperacao } from './entities/tipo_operacao.entity';

@Injectable()
export class TipoOperacaoService {
  constructor(
    @InjectRepository(TipoOperacao)
    private tipoOperacaoRepository: Repository<TipoOperacao>,
  ) {}

  // --- CREATE ---
  async create(createTipoOperacaoDto: CreateTipoOperacaoDto) {
    return this.tipoOperacaoRepository.save(createTipoOperacaoDto);
  }

  // --- READ ---
  async findAll() {
    return this.tipoOperacaoRepository.find({
      order: { nome: 'ASC' },
    });
  }

  // --- BUSCA ID OU RETORNA ERRO --
  async findOne(id: number) {
    const operacao = await this.tipoOperacaoRepository.findOneBy({ codigo: id });

    if (!operacao) {
      throw new NotFoundException(`Tipo de Operação com código ${id} não encontrada.`);
    }

    return operacao;
  }

  // --- UPDATE COM VERIFICAÇÃO ---
  async update(id: number, updateTipoOperacaoDto: UpdateTipoOperacaoDto) {
    // Garante que o registro existe antes de atualizar
    await this.findOne(id);

    // Executa a atualização
    await this.tipoOperacaoRepository.update(id, updateTipoOperacaoDto);

    // Retorna o objeto atualizado
    return this.findOne(id);
  }

  // -- DELETE
  async remove(id: number) {
    const result = await this.tipoOperacaoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Tipo de Operação com código ${id} não encontrada para exclusão.`,
      );
    }

    return { message: 'Removido com sucesso' };
  }
}

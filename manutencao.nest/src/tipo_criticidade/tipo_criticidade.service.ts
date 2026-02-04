import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoCriticidadeDto } from './dto/create-tipo_criticidade.dto';
import { UpdateTipoCriticidadeDto } from './dto/update-tipo_criticidade.dto';
import { TipoCriticidade } from './entities/tipo_criticidade.entity';

@Injectable()
export class TipoCriticidadeService {
  constructor(
    @InjectRepository(TipoCriticidade)
    private readonly tipoCriticidadeRepository: Repository<TipoCriticidade>,
  ) {}

  // --- CREATE ---
  async create(createTipoCriticidadeDto: CreateTipoCriticidadeDto) {
    // .save cria a instância e salva no banco em um passo
    return this.tipoCriticidadeRepository.save(createTipoCriticidadeDto);
  }

  // --- READ ---
  async findAll() {
    return this.tipoCriticidadeRepository.find({
      order: { nome: 'ASC' }, // Boa prática: ordenar listas alfabeticamente
    });
  }

  // --- BUSCA ID OU RETORNA ERRO ---
  async findOne(id: number) {
    const criticidade = await this.tipoCriticidadeRepository.findOneBy({ codigo: id });

    if (!criticidade) {
      throw new NotFoundException(`Criticidade com código ${id} não encontrada.`);
    }

    return criticidade;
  }

  // --- UPDATE COM VERIFICAÇÃO ---
  async update(id: number, updateTipoCriticidadeDto: UpdateTipoCriticidadeDto) {
    // Garante que existe antes de tentar atualizar
    await this.findOne(id);

    // Atualiza apenas os campos enviados
    await this.tipoCriticidadeRepository.update(id, updateTipoCriticidadeDto);

    // Retorna o objeto já atualizado
    return this.findOne(id);
  }

  // -- DELETE
  async remove(id: number) {
    const result = await this.tipoCriticidadeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Criticidade com código ${id} não encontrada para exclusão.`);
    }

    return { message: 'Removido com sucesso' };
  }
}

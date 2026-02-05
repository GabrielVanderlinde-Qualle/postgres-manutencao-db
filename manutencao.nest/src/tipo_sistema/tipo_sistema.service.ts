import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoSistemaDto } from './dto/create-tipo_sistema.dto';
import { UpdateTipoSistemaDto } from './dto/update-tipo_sistema.dto';
import { TipoSistema } from './entities/tipo_sistema.entity';

@Injectable()
export class TipoSistemaService {
  constructor(
    @InjectRepository(TipoSistema)
    private tipoSistemaRepository: Repository<TipoSistema>,
  ) {}

  // --- CREATE ---
  async create(createTipoSistemaDto: CreateTipoSistemaDto) {
    return this.tipoSistemaRepository.save(createTipoSistemaDto);
  }

  // --- READ ---
  async findAll() {
    return this.tipoSistemaRepository.find({
      order: { codigo: 'ASC' },
    });
  }

  // --- BUSCA ID OU RETORNA ERRO --
  async findOne(id: number) {
    const sistema = await this.tipoSistemaRepository.findOneBy({ codigo: id });

    if (!sistema) {
      throw new NotFoundException(`Sistema com código ${id} não encontrado.`);
    }

    return sistema;
  }

  // --- UPDATE COM VERIFICAÇÃO ---
  async update(id: number, updateTipoSistemaDto: UpdateTipoSistemaDto) {
    // 1. Garante que o sistema existe antes de atualizar
    await this.findOne(id);

    // 2. Realiza a atualização parcial
    await this.tipoSistemaRepository.update(id, updateTipoSistemaDto);

    // 3. Retorna o dado atualizado para o front-end
    return this.findOne(id);
  }

  // -- DELETE
  async remove(id: number) {
    const result = await this.tipoSistemaRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Sistema com código ${id} não encontrado para exclusão.`);
    }

    return { message: 'Removido com sucesso' };
  }
}

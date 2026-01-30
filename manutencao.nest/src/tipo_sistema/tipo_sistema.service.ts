import { Injectable } from '@nestjs/common';
import { CreateTipoSistemaDto } from './dto/create-tipo_sistema.dto';
import { UpdateTipoSistemaDto } from './dto/update-tipo_sistema.dto';
import { Repository } from 'typeorm';
import { TipoSistema } from './entities/tipo_sistema.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TipoSistemaService {
  constructor(
    @InjectRepository(TipoSistema)
    private tipoSistemaRepository: Repository<TipoSistema>,
  ) {}

  create(createTipoSistemaDto: CreateTipoSistemaDto) {
    return this.tipoSistemaRepository.save(createTipoSistemaDto);
  }

  findAll() {
    return this.tipoSistemaRepository.find();
  }

  findOne(id: number) {
    return this.tipoSistemaRepository.findOneBy({ codigo: id });
  }

  // Atualiza no Banco de Dados
  async update(id: number, updateTipoSistemaDto: UpdateTipoSistemaDto) {
    await this.tipoSistemaRepository.update(id, updateTipoSistemaDto);

    // 2. Busca o item atualizado para mostrar pro usuário
    return `This action updates a #${id} tipoSistema`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoSistema`;
  }
}

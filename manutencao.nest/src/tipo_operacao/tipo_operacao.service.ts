import { Injectable } from '@nestjs/common';
import { CreateTipoOperacaoDto } from './dto/create-tipo_operacao.dto';
import { UpdateTipoOperacaoDto } from './dto/update-tipo_operacao.dto';

@Injectable()
export class TipoOperacaoService {
  create(createTipoOperacaoDto: CreateTipoOperacaoDto) {
    return 'This action adds a new tipoOperacao';
  }

  findAll() {
    return `This action returns all tipoOperacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoOperacao`;
  }

  update(id: number, updateTipoOperacaoDto: UpdateTipoOperacaoDto) {
    return `This action updates a #${id} tipoOperacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoOperacao`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTipoCriticidadeDto } from './dto/create-tipo_criticidade.dto';
import { UpdateTipoCriticidadeDto } from './dto/update-tipo_criticidade.dto';

@Injectable()
export class TipoCriticidadeService {
  create(createTipoCriticidadeDto: CreateTipoCriticidadeDto) {
    return 'This action adds a new tipoCriticidade';
  }

  findAll() {
    return `This action returns all tipoCriticidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCriticidade`;
  }

  update(id: number, updateTipoCriticidadeDto: UpdateTipoCriticidadeDto) {
    return `This action updates a #${id} tipoCriticidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCriticidade`;
  }
}

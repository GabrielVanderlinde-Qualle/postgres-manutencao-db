import { Module } from '@nestjs/common';
import { TipoCriticidadeService } from './tipo_criticidade.service';
import { TipoCriticidadeController } from './tipo_criticidade.controller';

@Module({
  controllers: [TipoCriticidadeController],
  providers: [TipoCriticidadeService],
})
export class TipoCriticidadeModule {}

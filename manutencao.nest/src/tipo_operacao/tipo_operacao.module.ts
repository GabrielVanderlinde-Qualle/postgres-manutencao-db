import { Module } from '@nestjs/common';
import { TipoOperacaoService } from './tipo_operacao.service';
import { TipoOperacaoController } from './tipo_operacao.controller';

@Module({
  controllers: [TipoOperacaoController],
  providers: [TipoOperacaoService],
})
export class TipoOperacaoModule {}

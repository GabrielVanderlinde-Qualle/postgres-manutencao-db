import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoOperacao } from './entities/tipo_operacao.entity';
import { TipoOperacaoController } from './tipo_operacao.controller';
import { TipoOperacaoService } from './tipo_operacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoOperacao])],
  controllers: [TipoOperacaoController],
  providers: [TipoOperacaoService],
})
export class TipoOperacaoModule {}

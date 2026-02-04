import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCriticidade } from './entities/tipo_criticidade.entity';
import { TipoCriticidadeController } from './tipo_criticidade.controller';
import { TipoCriticidadeService } from './tipo_criticidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCriticidade])],
  controllers: [TipoCriticidadeController],
  providers: [TipoCriticidadeService],
})
export class TipoCriticidadeModule {}

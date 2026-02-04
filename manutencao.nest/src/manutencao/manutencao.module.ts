import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importação
import { Manutencao } from './entities/manutencao.entity'; // Importação
import { ManutencaoController } from './manutencao.controller';
import { ManutencaoService } from './manutencao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manutencao])], // Importação
  controllers: [ManutencaoController],
  providers: [ManutencaoService],
})
export class ManutencaoModule {}

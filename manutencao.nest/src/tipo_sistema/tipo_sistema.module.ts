import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSistema } from './entities/tipo_sistema.entity';
import { TipoSistemaController } from './tipo_sistema.controller';
import { TipoSistemaService } from './tipo_sistema.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSistema])],
  controllers: [TipoSistemaController],
  providers: [TipoSistemaService],
})
export class TipoSistemaModule {}

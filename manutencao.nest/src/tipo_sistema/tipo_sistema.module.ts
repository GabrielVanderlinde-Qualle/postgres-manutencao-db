import { Module } from '@nestjs/common';
import { TipoSistemaService } from './tipo_sistema.service';
import { TipoSistemaController } from './tipo_sistema.controller';
import { TipoSistema } from './entities/tipo_sistema.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSistema])],
  controllers: [TipoSistemaController],
  providers: [TipoSistemaService],
})
export class TipoSistemaModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoModule } from './manutencao/manutencao.module';
import { TipoSistemaModule } from './tipo_sistema/tipo_sistema.module';
import { TipoOperacaoModule } from './tipo_operacao/tipo_operacao.module';
import { TipoCriticidadeModule } from './tipo_criticidade/tipo_criticidade.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgre123',
      database: 'manutencao_db',
      entities: [],
      autoLoadEntities: true,
      synchronize: false, //Tabelas já Criadas no Banco Local
    }),
    ManutencaoModule,
    TipoSistemaModule,
    TipoOperacaoModule,
    TipoCriticidadeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

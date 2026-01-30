import { Injectable } from '@nestjs/common';
import { Manutencao } from './entities/manutencao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';

@Injectable()
export class ManutencaoService {
  constructor(
    @InjectRepository(Manutencao)
    private manutencaoRepository: Repository<Manutencao>,
  ) {}

  //Criar uma Nova Manutenção
  create(createManutencaoDto: CreateManutencaoDto) {
    const novaManutencao =
      this.manutencaoRepository.create(createManutencaoDto);
    return this.manutencaoRepository.save(novaManutencao);
  }

  // Lista Simples (SELECT * FROM manutencao)
  findAll() {
    return this.manutencaoRepository.find();
  }

  // 1. Relatório Completo com JOINS
  async gerarRelatorio() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.manutencaoRepository.query(`
      SELECT
          m.codigo,
          ts.nome as sistema,
          tope.nome as operacao,
          tc.nome as criticidade,
          m.data_cadastro,
          m.data_agendamento,
          m.data_finalizada,
          m.descricao
      FROM manutencao m
      JOIN tipo_sistema ts ON ts.codigo = m.codigo_tipo_sistema
      JOIN tipo_operacao tope ON tope.codigo = m.codigo_tipo_operacao
      JOIN tipo_criticidade tc ON tc.codigo = m.codigo_tipo_criticidade
      ORDER BY m.data_cadastro DESC
    `);
  }
  // 2. Dasbboard: Quantidade por sistema
  async contarPorSistema() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.manutencaoRepository.query(`
      select
      ts.nome,
        count(*) as total
      from manutencao m
      join tipo_sistema ts on ts.codigo = m.codigo_tipo_sistema
      group by ts.nome;
    `);
  }
}

import { Injectable } from '@nestjs/common';
import { Manutencao } from './entities/manutencao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';

@Injectable()
export class ManutencaoService {
  constructor(
    @InjectRepository(Manutencao)
    private manutencaoRepository: Repository<Manutencao>,
  ) {}

  async create(createManutencaoDto: CreateManutencaoDto) {
    // CORREÇÃO: Transforma os números (IDs) em Objetos { codigo: X }
    // O banco precisa disso para criar a relação
    const novaManutencao = this.manutencaoRepository.create({
      ...createManutencaoDto,
      tipoSistema: { codigo: createManutencaoDto.tipoSistema },
      tipoOperacao: { codigo: createManutencaoDto.tipoOperacao },
      tipoCriticidade: { codigo: createManutencaoDto.tipoCriticidade },
    });

    const salvo = await this.manutencaoRepository.save(novaManutencao);
    return this.findOne(salvo.codigo);
  }

  findAll() {
    return this.manutencaoRepository.find({
      relations: ['tipoSistema', 'tipoOperacao', 'tipoCriticidade'],
    });
  }

  findOne(id: number) {
    return this.manutencaoRepository.findOne({
      where: { codigo: id },
      relations: ['tipoSistema', 'tipoOperacao', 'tipoCriticidade'],
    });
  }

  async update(id: number, updateManutencaoDto: UpdateManutencaoDto) {
    // CORREÇÃO: Se vierem IDs para atualizar, converte para objeto também
    const dadosAtualizacao: any = { ...updateManutencaoDto };

    if (updateManutencaoDto.tipoSistema) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      dadosAtualizacao.tipoSistema = {
        codigo: updateManutencaoDto.tipoSistema,
      };
    }
    if (updateManutencaoDto.tipoOperacao) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      dadosAtualizacao.tipoOperacao = {
        codigo: updateManutencaoDto.tipoOperacao,
      };
    }
    if (updateManutencaoDto.tipoCriticidade) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      dadosAtualizacao.tipoCriticidade = {
        codigo: updateManutencaoDto.tipoCriticidade,
      };
    }

    await this.manutencaoRepository.update(id, dadosAtualizacao);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.manutencaoRepository.delete(id);
    return { message: `Manutenção ${id} removida com sucesso` };
  }

  // --- MÉTODOS EXTRAS (Relatórios) ---

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
      LEFT JOIN tipo_sistema ts ON ts.codigo = m.tipo_sistema
      LEFT JOIN tipo_operacao tope ON tope.codigo = m.tipo_operacao
      LEFT JOIN tipo_criticidade tc ON tc.codigo = m.tipo_criticidade
      ORDER BY m.data_cadastro DESC
    `);
  }

  async contarPorSistema() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.manutencaoRepository.query(`
      SELECT 
        ts.nome, 
        count(*) as total 
      FROM manutencao m
      JOIN tipo_sistema ts ON ts.codigo = m.tipo_sistema
      GROUP BY ts.nome;
    `);
  }

  async manutencoesPendentes() {
    return this.manutencaoRepository
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.tipoSistema', 'ts')
      .leftJoinAndSelect('m.tipoOperacao', 'to')
      .leftJoinAndSelect('m.tipoCriticidade', 'tc')
      .where('m.dataFinalizada IS NULL')
      .getMany();
  }
}

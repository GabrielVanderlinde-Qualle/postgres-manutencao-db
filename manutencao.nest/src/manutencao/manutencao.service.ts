import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';
import { Manutencao } from './entities/manutencao.entity';

@Injectable()
export class ManutencaoService {
  constructor(
    @InjectRepository(Manutencao)
    private manutencaoRepository: Repository<Manutencao>,
  ) {}

  // CREATE

  async create(createManutencaoDto: CreateManutencaoDto) {
    const novaManutencao = this.manutencaoRepository.create({
      ...createManutencaoDto,
      tipoSistema: { codigo: createManutencaoDto.tipoSistema },
      tipoOperacao: { codigo: createManutencaoDto.tipoOperacao },
      tipoCriticidade: { codigo: createManutencaoDto.tipoCriticidade },
    });

    const salvo = await this.manutencaoRepository.save(novaManutencao);
    // Retorna com os relacionamentos carregados
    return this.findOne(salvo.codigo);
  }

  // READ ALL
  
  findAll() {
    return this.manutencaoRepository.find({
      relations: ['tipoSistema', 'tipoOperacao', 'tipoCriticidade'],
      order: { dataCadastro: 'DESC' },
    });
  }

  // READ BY ID
  
  async findOne(id: number) {
    const manutencao = await this.manutencaoRepository.findOne({
      where: { codigo: id },
      relations: ['tipoSistema', 'tipoOperacao', 'tipoCriticidade'],
    });

    if (!manutencao) {
      throw new NotFoundException(`Manutenção ID ${id} não encontrada`);
    }
    return manutencao;
  }

  // UPDATE

  async update(id: number, updateManutencaoDto: UpdateManutencaoDto) {
    await this.findOne(id);

    const dadosParaAtualizar: any = {};

    if (updateManutencaoDto.descricao !== undefined) {
      dadosParaAtualizar.descricao = updateManutencaoDto.descricao;
    }

    if (updateManutencaoDto.dataAgendamento !== undefined) {
      dadosParaAtualizar.dataAgendamento = updateManutencaoDto.dataAgendamento;
    }

    if (updateManutencaoDto.dataFinalizada !== undefined) {
      dadosParaAtualizar.dataFinalizada = updateManutencaoDto.dataFinalizada;
    }

    if (updateManutencaoDto.tipoSistema !== undefined) {
      dadosParaAtualizar.tipoSistema = { codigo: updateManutencaoDto.tipoSistema };
    }

    if (updateManutencaoDto.tipoOperacao !== undefined) {
      dadosParaAtualizar.tipoOperacao = { codigo: updateManutencaoDto.tipoOperacao };
    }

    if (updateManutencaoDto.tipoCriticidade !== undefined) {
      dadosParaAtualizar.tipoCriticidade = { codigo: updateManutencaoDto.tipoCriticidade };
    }

    dadosParaAtualizar.codigo = id;

    await this.manutencaoRepository.save(dadosParaAtualizar);

    return this.findOne(id);
  }

  // DELETE

  async remove(id: number) {
    const result = await this.manutencaoRepository.delete(id);
    //(zero linhas afetadas), significa que o ID não existia.
    if (result.affected === 0) {
      throw new NotFoundException(`Manutenção ID ${id} não encontrada para exclusão`);
    }
    return { message: `Manutenção ${id} removida com sucesso` };
  }

  // --- MÉTODOS EXTRAS ---

  async gerarRelatorio() {
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

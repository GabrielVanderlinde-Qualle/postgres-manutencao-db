import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'; // <--- Importante
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TipoCriticidade } from '../../tipo_criticidade/entities/tipo_criticidade.entity';
import { TipoOperacao } from '../../tipo_operacao/entities/tipo_operacao.entity';
import { TipoSistema } from '../../tipo_sistema/entities/tipo_sistema.entity';

@Entity('manutencao')
export class Manutencao {
  @ApiProperty({ example: 1, description: 'Código único da manutenção' })
  @PrimaryGeneratedColumn('identity', { name: 'codigo' })
  codigo: number;

  // --- RELACIONAMENTOS ---

  @ManyToOne(() => TipoSistema)
  @JoinColumn({ name: 'tipo_sistema' })
  tipoSistema: TipoSistema;

  @ManyToOne(() => TipoOperacao)
  @JoinColumn({ name: 'tipo_operacao' })
  tipoOperacao: TipoOperacao;

  @ManyToOne(() => TipoCriticidade)
  @JoinColumn({ name: 'tipo_criticidade' })
  tipoCriticidade: TipoCriticidade;

  // --- COLUNAS TABELAS MANUTENCAO ---

  @ApiProperty({ example: '2024-02-01T10:00:00Z', description: 'Data de criação' })
  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamptz' })
  dataCadastro: Date;

  @ApiProperty({ example: '2024-02-10T14:00:00Z', description: 'Data agendada' })
  @Column({ name: 'data_agendamento', type: 'timestamp', nullable: true })
  dataAgendamento: Date;

  @ApiProperty({ example: null, description: 'Data de finalização (se houver)' })
  @Column({ name: 'data_finalizada', type: 'timestamp', nullable: true })
  dataFinalizada: Date;

  @ApiProperty({ example: 'Atualização', description: 'Descrição do serviço' })
  @Column({ type: 'text', nullable: true })
  descricao: string;
}

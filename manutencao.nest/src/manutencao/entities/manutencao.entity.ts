import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoSistema } from '../../tipo_sistema/entities/tipo_sistema.entity';
import { TipoOperacao } from '../../tipo_operacao/entities/tipo_operacao.entity';
import { TipoCriticidade } from '../../tipo_criticidade/entities/tipo_criticidade.entity';

@Entity('manutencao')
export class Manutencao {
  @PrimaryGeneratedColumn('identity', { name: 'codigo' })
  codigo: number;

  // --- RELACIONAMENTOS ---

  @ManyToOne(() => TipoSistema)
  @JoinColumn({ name: 'tipo_sistema' }) // Nome da coluna no Banco de Dados
  tipoSistema: TipoSistema;

  @ManyToOne(() => TipoOperacao)
  @JoinColumn({ name: 'tipo_operacao' })
  tipoOperacao: TipoOperacao;

  @ManyToOne(() => TipoCriticidade)
  @JoinColumn({ name: 'tipo_criticidade' })
  tipoCriticidade: TipoCriticidade;

  @Column({
    name: 'data_agendamento',
    type: 'timestamp',
    nullable: true,
  })
  dataAgendamento: Date;

  @Column({
    name: 'data_finalizada',
    type: 'timestamp',
    nullable: true,
  })
  dataFinalizada: Date;

  @CreateDateColumn({ name: 'data_cadastro', type: 'timestamptz' })
  dataCadastro: Date;

  @Column({ type: 'text', nullable: true })
  descricao: string;
}

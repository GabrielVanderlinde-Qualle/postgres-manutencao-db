import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_criticidade')
export class TipoCriticidade {
  @ApiProperty({ example: 1, description: 'ID único do registro' })
  @PrimaryGeneratedColumn('identity', { name: 'codigo' })
  codigo: number;

  @ApiProperty({ example: 'Imediata', description: 'Tipo da Criticidade' })
  @Column()
  nome: string;

  @ApiProperty({ example: 'Descrição', description: 'Descrição da Criticidade' })
  @Column({ nullable: true })
  descricao: string;
}

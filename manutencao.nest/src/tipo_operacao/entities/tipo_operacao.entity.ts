import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_operacao')
export class TipoOperacao {
  @ApiProperty({ example: 1, description: 'ID único do registro' })
  @PrimaryGeneratedColumn('identity', { name: 'codigo' })
  codigo: number;

  @ApiProperty({ example: 'Manutenção', description: 'Tipo da Operação' })
  @Column()
  nome: string;

  @ApiProperty({ example: 'Descrição', description: 'Descrição da Operação' })
  @Column()
  descricao: string;
}

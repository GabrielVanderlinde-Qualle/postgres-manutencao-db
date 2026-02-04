import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_sistema')
export class TipoSistema {
  @ApiProperty({ example: 1, description: 'ID único do registro' })
  @PrimaryGeneratedColumn('identity', { name: 'codigo' })
  codigo: number;

  @ApiProperty({ example: 'Alerta Sul', description: 'Nome do Sistema' })
  @Column()
  nome: string;

  @ApiProperty({ example: 'Descrição', description: 'Descrição do Sistema' })
  @Column()
  descricao: string;
}

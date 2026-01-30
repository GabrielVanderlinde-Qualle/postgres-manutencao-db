import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_sistema')
export class TipoSistema {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;
}

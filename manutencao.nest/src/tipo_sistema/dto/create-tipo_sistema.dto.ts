import { IsString } from 'class-validator';

export class CreateTipoSistemaDto {
  @IsString()
  nome: string;
  @IsString()
  descricao: string;
}

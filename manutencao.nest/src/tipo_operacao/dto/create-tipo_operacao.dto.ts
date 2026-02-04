import { IsString } from 'class-validator';

export class CreateTipoOperacaoDto {
  @IsString()
  nome: string;
  @IsString()
  descricao: string;
}

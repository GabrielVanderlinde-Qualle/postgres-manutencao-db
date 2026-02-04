import { IsString } from 'class-validator';

export class CreateTipoCriticidadeDto {
  @IsString()
  nome: string;
  @IsString()
  descricao: string;
}

import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateManutencaoDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  descricao: string;

  // Recebe apenas o ID (número)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  tipoSistema: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  tipoOperacao: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  tipoCriticidade: number;

  // Permite enviar data no formato ISO 8601
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDateString()
  dataAgendamento?: Date;

  // Geralmente cria-se sem finalizar, mas deixamos opcional
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsDateString()
  dataFinalizada?: Date;
}

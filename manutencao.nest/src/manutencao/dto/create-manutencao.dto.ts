import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManutencaoDto {
  // --- DESCRIÇÃO --
  @ApiProperty({
    description: 'Descrição detalhada da manutenção',
    example: 'Implementar Funcionalidade',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  // --- TIPO SISTEMA --
  @ApiProperty({
    description: 'ID do Sistema (Ex: 1 para Alerta Sul, 2 para Defesa Civil)',
    example: 1,
  })
  @IsInt()
  tipoSistema: number;

  // --- TIPO OPERAÇÃO --
  @ApiProperty({
    description: 'ID do Tipo de Operação (Ex: 1 Preventiva, 2 Agendada)',
    example: 2,
  })
  @IsInt()
  tipoOperacao: number;

  // --- TIPO CRITICIDADE --
  @ApiProperty({
    description: 'ID da Criticidade (Ex: 1 Baixa, 3 Alta)',
    example: 3,
  })
  @IsInt()
  tipoCriticidade: number;

  // --- DATA AGENDAMENTO --
  @ApiPropertyOptional({
    description: 'Data prevista para execução (ISO 8601)',
    example: '2024-02-10T14:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dataAgendamento?: Date;

  // --- DATA FINALIZADA --
  @ApiPropertyOptional({
    description: 'Data em que o serviço foi concluído',
    example: '2024-02-10T16:30:00Z',
  })
  @IsOptional()
  @IsDateString()
  dataFinalizada?: Date;
}

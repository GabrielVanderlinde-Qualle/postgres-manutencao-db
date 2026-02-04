import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoCriticidadeDto {
  @ApiProperty({
    example: 'Cadastro de tipo de serviços. Ex: Agendada, Imediata, etc',
    description: 'Descreva a Criticidade da Manutenção',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da criticidade não pode ser vazio.' })
  nome: string;

  @ApiProperty({
    example: 'Imediata devido a Manutenção Urgente',
    description: 'Breve descrição técnica',
    required: false, // Indica no Swagger que não é obrigatório
  })
  @IsOptional()
  @IsString()
  descricao: string; // O '?' indica ao TypeScript que pode ser undefined
}

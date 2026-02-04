import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoOperacaoDto {
  @ApiProperty({
    example: 'Operações individuais. Ex: Manutenção, Desligamento do sistema, etc',
    description: 'Descreva qual o Tipo de Operação a ser realizada',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome da operação é obrigatório.' })
  nome: string;

  @ApiProperty({
    example: 'Operação de Teste de Sistema',
    description: 'Breve descrição técnica',
    required: false, // Indica no Swagger que não é obrigatório
  })
  @IsOptional()
  @IsString()
  descricao: string;
}

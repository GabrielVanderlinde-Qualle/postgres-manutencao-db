import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoSistemaDto {
  @ApiProperty({
    example: 'Ex: AlertaSul, Qualle Hidro, etc',
    description: 'Nome do sistema a ser Cadastrado',
  })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome do sistema é obrigatório.' })
  nome: string;

  @ApiProperty({
    example: 'Sistema de monitoramento 24h',
    description: 'Breve descrição técnica',
    required: false, // Indica no Swagger que não é obrigatório
  })
  @IsOptional() // Permite que o campo seja nulo ou indefinido
  @IsString()
  descricao?: string;
}

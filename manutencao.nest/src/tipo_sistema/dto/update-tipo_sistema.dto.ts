import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoSistemaDto } from './create-tipo_sistema.dto';

export class UpdateTipoSistemaDto extends PartialType(CreateTipoSistemaDto) {}

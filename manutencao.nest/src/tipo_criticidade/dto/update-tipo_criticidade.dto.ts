import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCriticidadeDto } from './create-tipo_criticidade.dto';

export class UpdateTipoCriticidadeDto extends PartialType(CreateTipoCriticidadeDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoOperacaoService } from './tipo_operacao.service';
import { CreateTipoOperacaoDto } from './dto/create-tipo_operacao.dto';
import { UpdateTipoOperacaoDto } from './dto/update-tipo_operacao.dto';

@Controller('tipo-operacao')
export class TipoOperacaoController {
  constructor(private readonly tipoOperacaoService: TipoOperacaoService) {}

  @Post()
  create(@Body() createTipoOperacaoDto: CreateTipoOperacaoDto) {
    return this.tipoOperacaoService.create(createTipoOperacaoDto);
  }

  @Get()
  findAll() {
    return this.tipoOperacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoOperacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoOperacaoDto: UpdateTipoOperacaoDto) {
    return this.tipoOperacaoService.update(+id, updateTipoOperacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoOperacaoService.remove(+id);
  }
}

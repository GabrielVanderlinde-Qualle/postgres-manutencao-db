import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Adicionado ApiTags
import { CreateTipoOperacaoDto } from './dto/create-tipo_operacao.dto';
import { UpdateTipoOperacaoDto } from './dto/update-tipo_operacao.dto';
import { TipoOperacao } from './entities/tipo_operacao.entity';
import { TipoOperacaoService } from './tipo_operacao.service';

@ApiTags('Tipo Operação') // <--- Agrupa na UI do Swagger
@Controller('tipo-operacao')
export class TipoOperacaoController {
  constructor(private readonly tipoOperacaoService: TipoOperacaoService) {}

  @ApiOperation({ summary: 'Cria um novo tipo de operação' })
  @ApiResponse({ status: 201, description: 'Criado com sucesso.', type: TipoOperacao })
  @Post()
  create(@Body() createTipoOperacaoDto: CreateTipoOperacaoDto) {
    return this.tipoOperacaoService.create(createTipoOperacaoDto);
  }

  @ApiOperation({ summary: 'Lista todos os tipos de operação' })
  @ApiResponse({ status: 200, type: [TipoOperacao] })
  @Get()
  findAll() {
    return this.tipoOperacaoService.findAll();
  }

  @ApiOperation({ summary: 'Busca um tipo de operação pelo ID' })
  @ApiResponse({ status: 200, type: TipoOperacao })
  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tipoOperacaoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza um tipo de operação' })
  @ApiResponse({ status: 200, description: 'Atualizado com sucesso.', type: TipoOperacao })
  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTipoOperacaoDto: UpdateTipoOperacaoDto,
  ) {
    return this.tipoOperacaoService.update(id, updateTipoOperacaoDto);
  }

  @ApiOperation({ summary: 'Remove um tipo de operação' })
  @ApiResponse({ status: 200, description: 'Removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoOperacaoService.remove(id);
  }
}
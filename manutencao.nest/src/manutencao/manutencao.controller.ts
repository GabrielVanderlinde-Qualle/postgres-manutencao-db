import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';
import { Manutencao } from './entities/manutencao.entity';
import { ManutencaoService } from './manutencao.service';

@ApiTags('Manutenção') // Agrupa as rotas no Swagger
@Controller('manutencao')
export class ManutencaoController {
  constructor(private readonly manutencaoService: ManutencaoService) {}

  // --- CREATE ---
  @Post()
  @ApiOperation({ summary: 'Cria uma nova manutenção' })
  @ApiResponse({ status: 201, description: 'Ordem criada com sucesso.', type: Manutencao })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createManutencaoDto: CreateManutencaoDto) {
    return this.manutencaoService.create(createManutencaoDto);
  }

  // --- READ (Relatórios e Dashboards) ---
  @Get('relatorio-geral')
  @ApiOperation({ summary: 'Gera relatório geral das manutenções' })
  @ApiResponse({ status: 200, description: 'Relatório gerado com sucesso.' })
  getRelatorio() {
    return this.manutencaoService.gerarRelatorio();
  }

  @Get('dashboard/sistema')
  @ApiOperation({ summary: 'Contagem de manutenções por sistema' })
  @ApiResponse({ status: 200, description: 'Dados agrupados retornados.' })
  getDashboardPorSistema() {
    return this.manutencaoService.contarPorSistema();
  }

  @Get('pendentes')
  @ApiOperation({ summary: 'Lista apenas manutenções pendentes' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  manutencoesPendentes() {
    return this.manutencaoService.manutencoesPendentes();
  }

  // --- READ (CRUD Padrão) ---
  @Get()
  @ApiOperation({ summary: 'Lista todas as manutenções' })
  @ApiResponse({ status: 200, description: 'Lista completa retornada.' })
  findAll() {
    return this.manutencaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma manutenção pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da manutenção', example: 1 })
  @ApiResponse({ status: 200, description: 'Manutenção encontrada.' })
  @ApiResponse({ status: 404, description: 'Manutenção não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe converte automaticamente "1" (string) para 1 (number)
    return this.manutencaoService.findOne(id);
  }

  // --- UPDATE ---
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de uma manutenção' })
  @ApiParam({ name: 'id', description: 'ID da manutenção a atualizar' })
  @ApiResponse({ status: 200, description: 'Atualizado com sucesso.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateManutencaoDto: UpdateManutencaoDto) {
    return this.manutencaoService.update(id, updateManutencaoDto);
  }

  // --- DELETE ---
  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma manutenção do banco' })
  @ApiParam({ name: 'id', description: 'ID da manutenção a remover' })
  @ApiResponse({ status: 200, description: 'Removido com sucesso.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.manutencaoService.remove(id);
  }
}

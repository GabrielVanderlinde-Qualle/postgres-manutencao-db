import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManutencaoService } from './manutencao.service';
import { CreateManutencaoDto } from './dto/create-manutencao.dto';
import { UpdateManutencaoDto } from './dto/update-manutencao.dto';

@Controller('manutencao')
export class ManutencaoController {
  constructor(private readonly manutencaoService: ManutencaoService) {}

  // 1. Criar manutenção
  @Post()
  create(@Body() createManutencaoDto: CreateManutencaoDto) {
    return this.manutencaoService.create(createManutencaoDto);
  }

  // URL: http://localhost:3000/manutencao/relatorio-geral
  @Get('relatorio-geral')
  getRelatorio() {
    return this.manutencaoService.gerarRelatorio();
  }

  @Get('dashboard')
  getDashboard() {
    return this.manutencaoService.contarPorSistema();
  }

  @Get('contarSistema')
  contarPorSistema() {
    return this.manutencaoService.contarPorSistema();
  }

  // 2. Listar todas (padrão)
  @Get('listar-todas')
  findAll() {
    return this.manutencaoService.findAll();
  }

  @Get('pendentes')
  manutencoesPendentes() {
    return this.manutencaoService.manutencoesPendentes();
  }

  //3. Buscar uma manutenção pelo ID
  @Get('id')
  findOne(@Param('id') id: string) {
    return this.manutencaoService.findOne(+id);
  }

  // Atualzar Manutenção
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateManutencaoDto: UpdateManutencaoDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.manutencaoService.update(+id, UpdateManutencaoDto);
  }

  // Excluir Manutenção
  @Delete(':id')
  remove(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.manutencaoService.remove(+id);
  }
}

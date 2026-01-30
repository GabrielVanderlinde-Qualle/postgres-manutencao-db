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

  // URL: http://localhost:3000/manutencao/dashboard
  @Get('dashboard')
  getDashboard() {
    return this.manutencaoService.contarPorSistema();
  }

  // 2. Listar todas (padrão)
  @Get()
  findAll() {
    return this.manutencaoService.findAll();
  }

  //3. Buscar uma manutenção pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Esta ação retorna a manutenção #${id}`;
  }

  // Atualzar Manutenção
  @Patch(':id')
  update(@Param('id') id: string) {
    return `Esta ação atualiza a manutenção #${id}`;
  }

  // Excluir Manutenção
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Esta ação remove a manutenção #${id}`;
  }
}

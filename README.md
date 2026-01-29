# Estrutura de Banco de Dados – Manutenção de Sistemas

Este repositório contém a estrutura de banco de dados PostgreSQL para controle de **manutenções de sistemas**, incluindo tipos de sistema, operações, criticidade e registros de manutenção.

O projeto foi desenvolvido com foco em **padronização**, **boas práticas** e **facilidade de manutenção**.

---

## Tecnologias Utilizadas

- PostgreSQL
- pgAdmin 4
- SQL padrão (DDL e DML)

---

## Estrutura do Banco de Dados

O banco é composto pelas seguintes tabelas:

### Tabelas de domínio
- **tipo_sistema**
- **tipo_operacao**
- **tipo_criticidade**

Todas possuem:
- `codigo` (incremental automático com `IDENTITY`)
- `nome`
- `descricao`

### Tabela principal
- **manutencao**

Relaciona:
- Sistema
- Operação
- Criticidade

Campos principais:
- `codigo`
- `codigo_tipo_sistema`
- `codigo_tipo_operacao`
- `codigo_tipo_criticidade`
- `data_cadastro`
- `data_agendamento`
- `data_finalizada`
- `descricao`

---

## Relacionamentos

- `manutencao.codigo_tipo_sistema` → `tipo_sistema.codigo`
- `manutencao.codigo_tipo_operacao` → `tipo_operacao.codigo`
- `manutencao.codigo_tipo_criticidade` → `tipo_criticidade.codigo`

Todos os relacionamentos utilizam **chaves estrangeiras (FK)**.

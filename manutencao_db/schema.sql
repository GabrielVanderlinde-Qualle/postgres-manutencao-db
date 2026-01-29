create table tipo_sistema (
    codigo integer generated always as identity primary key,
    nome varchar(100) not null,
    descricao varchar(255)
);

create table tipo_operacao (
    codigo integer generated always as identity primary key,
    nome varchar(100) not null,
    descricao varchar(255)
);

create table tipo_criticidade (
    codigo integer generated always as identity primary key,
    nome varchar(100) not null,
    descricao varchar(255)
);

create table manutencao (
    codigo integer generated always as identity primary key,

    codigo_tipo_sistema integer not null,
    codigo_tipo_operacao integer not null,
    codigo_tipo_criticidade integer not null,

    data_cadastro timestamp not null default now(),
    data_agendamento timestamp,
    data_finalizada timestamp,
    descricao text,

    constraint fk_sistema
        foreign key (codigo_tipo_sistema)
        references tipo_sistema(codigo),

    constraint fk_operacao
        foreign key (codigo_tipo_operacao)
        references tipo_operacao(codigo),

    constraint fk_criticidade
        foreign key (codigo_tipo_criticidade)
        references tipo_criticidade(codigo)
);

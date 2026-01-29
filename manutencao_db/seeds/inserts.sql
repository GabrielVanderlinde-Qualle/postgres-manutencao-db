insert into tipo_sistema (nome, descricao) values
('Alerta Sul', 'Sistema de monitoramento de alertas'),
('Quale Hidro', 'Sistema de monitoramento hídrico');

insert into tipo_operacao (nome, descricao) values
('Manutenção', 'Manutenção do Sistema'),
('Desligamento do sistema', 'Sistema desligado temporariamente');

insert into tipo_criticidade (nome, descricao) values
('Agendada', 'Serviço planejado'),
('Imediata', 'Ação urgente');

insert into manutencao (
    codigo_tipo_sistema,
    codigo_tipo_operacao,
    codigo_tipo_criticidade,
    descricao
) values (
    1, 1, 1, 'Manutenção Planejada no sistema Alerta Sul'
);

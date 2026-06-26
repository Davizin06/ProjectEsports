INSERT INTO time_esports (nome, data_fundacao, vitorias_totais) VALUES
('FURIA', '2017-08-01', 0),
('LOUD', '2019-02-28', 0),
('paiN Gaming', '2010-03-15', 0),
('MIBR', '2003-03-01', 0);

INSERT INTO jogo (titulo, genero, versao) VALUES
('Counter-Strike 2', 'FPS', '1.40.0'),
('Valorant', 'FPS', '10.08'),
('League of Legends', 'MOBA', '15.10'),
('Rocket League', 'SPORTS', '2.45');

INSERT INTO campeonato (nome, premiacao, id_jogo) VALUES
('Inatel Esports Cup 2026', 15000.00, 1),
('Circuito Nacional Gamer', 30000.00, 2),
('Liga Universitária de LoL', 12000.00, 3);

INSERT INTO jogador (nickname, idade_jogador, salario, id_time) VALUES
('KSCERATO', 24, 25000.00, 1),
('yuurih', 26, 24000.00, 1),
('saadhak', 28, 30000.00, 2),
('Less', 21, 27000.00, 2),
('tinowns', 28, 22000.00, 3),
('Cariok', 25, 21000.00, 3),
('exit', 27, 18000.00, 4),
('brnz4n', 22, 17000.00, 4);

INSERT INTO partida (
    data_hora,
    duracao,
    id_camp,
    id_time_a,
    id_time_b,
    id_time_vencedor,
    placar_time_a,
    placar_time_b
) VALUES
('2026-06-02 19:00:00', NULL, 1, 1, 4, NULL, 0, 0),
('2026-06-03 20:00:00', NULL, 2, 2, 3, NULL, 0, 0),
('2026-06-05 18:30:00', '00:45:00', 1, 1, 3, 1, 2, 1),
('2026-07-06 21:00:00', NULL, 3, 2, 4, NULL, 0, 0);

INSERT INTO desempenho_jogador (id_jogador, id_partida, kills, deaths, assists) VALUES
(1, 1, 18, 12, 5),
(2, 1, 15, 14, 7),
(7, 1, 14, 16, 4),
(8, 1, 11, 17, 6),

(3, 2, 20, 10, 8),
(4, 2, 17, 13, 9),
(5, 2, 13, 18, 11),
(6, 2, 12, 15, 10),

(1, 3, 24, 13, 6),
(2, 3, 19, 15, 8),
(5, 3, 16, 20, 7),
(6, 3, 14, 18, 9),

(3, 4, 0, 0, 0),
(4, 4, 0, 0, 0),
(7, 4, 0, 0, 0),
(8, 4, 0, 0, 0);

INSERT INTO sumula_oficial (aprovado_juiz, id_partida) VALUES
(TRUE, 3),
(FALSE, 1);

SELECT * FROM time_esports;
SELECT * FROM jogador;
SELECT * FROM jogo;
SELECT * FROM campeonato;
SELECT * FROM partida;
SELECT * FROM desempenho_jogador;
SELECT * FROM sumula_oficial;

SELECT
    p.id_partida,
    c.nome AS campeonato,
    j.titulo AS jogo,
    ta.nome AS time_a,
    tb.nome AS time_b,
    tv.nome AS vencedor,
    p.placar_time_a,
    p.placar_time_b,
    p.duracao,
    p.data_hora
FROM partida p
INNER JOIN campeonato c ON p.id_camp = c.id_camp
INNER JOIN jogo j ON c.id_jogo = j.id_jogo
INNER JOIN time_esports ta ON p.id_time_a = ta.id_time
INNER JOIN time_esports tb ON p.id_time_b = tb.id_time
LEFT JOIN time_esports tv ON p.id_time_vencedor = tv.id_time
ORDER BY p.data_hora DESC;

SELECT
    jo.nickname,
    t.nome AS time,
    SUM(d.kills) AS total_kills,
    SUM(d.deaths) AS total_deaths,
    SUM(d.assists) AS total_assists,
    calcular_kda(SUM(d.kills)::int, SUM(d.deaths)::int, SUM(d.assists)::int) AS kda
FROM desempenho_jogador d
INNER JOIN jogador jo ON d.id_jogador = jo.id_jogador
INNER JOIN time_esports t ON jo.id_time = t.id_time
GROUP BY jo.nickname, t.nome
HAVING SUM(d.kills) > 20
ORDER BY total_kills DESC;

SELECT
    p.id_partida,
    s.id_sumula,
    s.aprovado_juiz
FROM partida p
INNER JOIN sumula_oficial s ON p.id_partida = s.id_partida;

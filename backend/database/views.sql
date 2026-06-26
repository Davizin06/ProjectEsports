CREATE OR REPLACE VIEW vw_ranking_jogadores AS
SELECT
    jo.id_jogador,
    jo.nickname,
    t.nome AS time,
    COALESCE(SUM(d.kills), 0) AS total_kills,
    COALESCE(SUM(d.deaths), 0) AS total_deaths,
    COALESCE(SUM(d.assists), 0) AS total_assists,
    ROUND(
        COALESCE((SUM(d.kills) + SUM(d.assists))::numeric / NULLIF(SUM(d.deaths), 0), 0),
        2
    ) AS kda
FROM jogador jo
INNER JOIN time_esports t ON jo.id_time = t.id_time
LEFT JOIN desempenho_jogador d ON jo.id_jogador = d.id_jogador
GROUP BY jo.id_jogador, jo.nickname, t.nome;

SELECT * FROM vw_ranking_jogadores
ORDER BY kda DESC;

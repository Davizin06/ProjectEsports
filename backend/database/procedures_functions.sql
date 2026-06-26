CREATE OR REPLACE FUNCTION calcular_kda(
    p_kills INT,
    p_deaths INT,
    p_assists INT
)
RETURNS NUMERIC AS $$
BEGIN
    RETURN ROUND(
        COALESCE((p_kills + p_assists)::numeric / NULLIF(p_deaths, 0), 0),
        2
    );
END;
$$ LANGUAGE plpgsql;

SELECT calcular_kda(20, 10, 8) AS kda;


CREATE OR REPLACE PROCEDURE finalizar_partida(
    p_id_partida BIGINT,
    p_duracao TIME,
    p_id_time_vencedor BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE partida
    SET
        duracao = p_duracao,
        id_time_vencedor = p_id_time_vencedor
    WHERE id_partida = p_id_partida;
END;
$$;

CREATE OR REPLACE FUNCTION atualizar_vitorias_time()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id_time_vencedor IS NOT NULL
       AND OLD.id_time_vencedor IS NULL THEN

        UPDATE time_esports
        SET vitorias_totais = vitorias_totais + 1
        WHERE id_time = NEW.id_time_vencedor;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_atualizar_vitorias_time ON partida;

CREATE TRIGGER trg_atualizar_vitorias_time
AFTER UPDATE ON partida
FOR EACH ROW
EXECUTE FUNCTION atualizar_vitorias_time();

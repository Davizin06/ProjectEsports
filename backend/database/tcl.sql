BEGIN;

SAVEPOINT antes_finalizacao;

CALL finalizar_partida(2, '00:38:00', 2);

-- Caso algo esteja errado:
-- ROLLBACK TO SAVEPOINT antes_finalizacao;

COMMIT;

SELECT * FROM partida WHERE id_partida = 2;
SELECT * FROM time_esports WHERE id_time = 2;

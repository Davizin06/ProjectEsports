DROP USER IF EXISTS professor_bd;
DROP ROLE IF EXISTS role_leitura;

CREATE ROLE role_leitura;

GRANT CONNECT ON DATABASE "ProjectEsports" TO role_leitura;
GRANT USAGE ON SCHEMA public TO role_leitura;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO role_leitura;

CREATE USER professor_bd WITH PASSWORD '123456';
GRANT role_leitura TO professor_bd;

-- Exemplo de revogação:
REVOKE SELECT ON desempenho_jogador FROM role_leitura;

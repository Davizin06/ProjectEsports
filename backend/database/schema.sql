DROP TABLE IF EXISTS sumula_oficial CASCADE;
DROP TABLE IF EXISTS desempenho_jogador CASCADE;
DROP TABLE IF EXISTS partida CASCADE;
DROP TABLE IF EXISTS jogador CASCADE;
DROP TABLE IF EXISTS campeonato CASCADE;
DROP TABLE IF EXISTS jogo CASCADE;
DROP TABLE IF EXISTS time_esports CASCADE;

CREATE TABLE time_esports (
    id_time BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    data_fundacao DATE,
    vitorias_totais INT NOT NULL DEFAULT 0 CHECK (vitorias_totais >= 0)
);

CREATE TABLE jogo (
    id_jogo BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL UNIQUE,
    genero VARCHAR(30) NOT NULL CHECK (genero IN ('FPS', 'MOBA', 'BATTLE_ROYALE', 'SPORTS')),
    versao VARCHAR(45)
);

CREATE TABLE campeonato (
    id_camp BIGSERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    premiacao NUMERIC(12,2) CHECK (premiacao >= 0),
    id_jogo BIGINT,
    CONSTRAINT fk_campeonato_jogo
        FOREIGN KEY (id_jogo)
        REFERENCES jogo(id_jogo)
);

CREATE TABLE jogador (
    id_jogador BIGSERIAL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    idade_jogador INT CHECK (idade_jogador >= 12),
    salario NUMERIC(10,2) CHECK (salario >= 0),
    id_time BIGINT,
    CONSTRAINT fk_jogador_time
        FOREIGN KEY (id_time)
        REFERENCES time_esports(id_time)
);

CREATE TABLE partida (
    id_partida BIGSERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    duracao TIME,
    id_camp BIGINT,
    id_time_a BIGINT NOT NULL,
    id_time_b BIGINT NOT NULL,
    id_time_vencedor BIGINT,
    placar_time_a INT DEFAULT 0 CHECK (placar_time_a >= 0),
    placar_time_b INT DEFAULT 0 CHECK (placar_time_b >= 0),

    CONSTRAINT fk_partida_campeonato
        FOREIGN KEY (id_camp)
        REFERENCES campeonato(id_camp),

    CONSTRAINT fk_partida_time_a
        FOREIGN KEY (id_time_a)
        REFERENCES time_esports(id_time),

    CONSTRAINT fk_partida_time_b
        FOREIGN KEY (id_time_b)
        REFERENCES time_esports(id_time),

    CONSTRAINT fk_partida_vencedor
        FOREIGN KEY (id_time_vencedor)
        REFERENCES time_esports(id_time),

    CONSTRAINT chk_times_diferentes
        CHECK (id_time_a <> id_time_b),

    CONSTRAINT chk_vencedor_participante
        CHECK (
            id_time_vencedor IS NULL
            OR id_time_vencedor = id_time_a
            OR id_time_vencedor = id_time_b
        )
);

CREATE TABLE desempenho_jogador (
    id_jogador BIGINT NOT NULL,
    id_partida BIGINT NOT NULL,
    kills INT NOT NULL DEFAULT 0 CHECK (kills >= 0),
    deaths INT NOT NULL DEFAULT 0 CHECK (deaths >= 0),
    assists INT NOT NULL DEFAULT 0 CHECK (assists >= 0),

    PRIMARY KEY (id_jogador, id_partida),

    CONSTRAINT fk_desempenho_jogador
        FOREIGN KEY (id_jogador)
        REFERENCES jogador(id_jogador),

    CONSTRAINT fk_desempenho_partida
        FOREIGN KEY (id_partida)
        REFERENCES partida(id_partida)
);

CREATE TABLE sumula_oficial (
    id_sumula BIGSERIAL PRIMARY KEY,
    aprovado_juiz BOOLEAN NOT NULL DEFAULT FALSE,
    id_partida BIGINT UNIQUE,
    CONSTRAINT fk_sumula_partida
        FOREIGN KEY (id_partida)
        REFERENCES partida(id_partida)
);

CREATE INDEX idx_jogador_nickname ON jogador(nickname);
CREATE INDEX idx_partida_data_hora ON partida(data_hora);
CREATE INDEX idx_partida_campeonato ON partida(id_camp);
CREATE INDEX idx_desempenho_partida ON desempenho_jogador(id_partida);

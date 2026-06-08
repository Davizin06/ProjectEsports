# ProjectEsports

API REST para gerenciamento de campeonatos de esports.

## Pré-requisitos

- Java 21
- Maven
- PostgreSQL

## Configuração do banco de dados

Crie um banco de dados no PostgreSQL:

```sql
CREATE DATABASE "ProjectEsports";
```

No arquivo `src/main/resources/application.properties`, configure as credenciais:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ProjectEsports
spring.datasource.username=postgres
spring.datasource.password=sua_senha
```

## Como rodar

```bash
mvn spring-boot:run
```

A aplicação sobe na porta `8080`. As tabelas são criadas automaticamente pelo Hibernate na primeira execução.

## Documentação

Com a aplicação rodando, acesse o Swagger em:

```
http://localhost:8080/swagger-ui/index.html
```
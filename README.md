# API de Transferências e Usuários

Esta API permite login, registro de usuários, consulta de usuários e transferência de valores, com regras básicas de negócio. O banco de dados é em memória.

## Instalação

1. Instale as dependências:
   ```powershell
   npm install express swagger-ui-express
   ```
2. Para rodar a API:
   ```powershell
   node server.js
   ```

## Endpoints

- `POST /register`: Registra um novo usuário. Campos obrigatórios: `username`, `password`. Opcional: `favorecidos` (array de usernames).
- `POST /login`: Realiza login. Campos obrigatórios: `username`, `password`.
- `GET /users`: Lista todos os usuários registrados.
- `POST /transfer`: Realiza transferência. Campos obrigatórios: `from`, `to`, `amount`.
- `GET /transfers`: Lista todas as transferências realizadas.
- `GET /api-docs`: Documentação Swagger da API.

## Regras de Negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.

## Testes

Para testar a API com Supertest, importe o `app.js` em seu arquivo de teste.

## Estrutura de Diretórios

- `controllers/`: Lógica dos endpoints
- `services/`: Regras de negócio
- `models/`: Dados em memória
- `app.js`: Configuração das rotas
- `server.js`: Inicialização do servidor
- `swagger.json`: Documentação Swagger

---

API criada para fins educacionais de automação de testes.

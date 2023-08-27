## Clone o projeto e acesse a pasta do repositório

```bash
# git clone REPOSITÓRIO_PROJETO && cd/NOME_PROJETO
$ git clone https://github.com/Gabriel-souzaa/ivrim_test.git && cd ivrim_test/task-manager-api
```

**Siga os passos**

```bash
# Instale as dependências
$ npm install

# Execute uma migração para criar suas tabelas de banco de dados com Prisma Migrate
$ npx prisma migrate dev --name init

# Execute os testes para verificar se a aplicação está rodando como deveria
$ npx run test

# inicie o projeto como dev
$ npm run dev

# Se todos os passos foram seguidos corretamente a api deve ser iniciada
```
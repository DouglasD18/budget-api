# Budget API

![Aplicação rodando](cashforce-view.png)

# Contexto
Projeto de uma aplicação fullstack com api de consulta em banco de dados MySQL, através da ORM Sequelize, para vizualição de Notas Fiscais registradas no mesmo.

## Técnologias usadas

> Desenvolvido usando: NodeJS, ExpressJS, TypeScript, MySQL, Sequelize, Cors, Nodemon, Dotenv, Jest, Mocha, Sinon, Chai

# Rodando Aplicação

## Clonando o Repositório

```
  git clone git@github.com:DouglasD18/budget-api.git
  cd budget-api
  ```

## Rodando com Docker

* Buildando o Dockerfile
  ```
  docker build -t budget-api .
  ```

* Rodando a aplicação
  ```
  docker run -it -p 3333:3333 budget-api:latest
  ```

## Rodando sem Docker

### Instalando Dependências

```bash
cd backend/ 
npm install
``` 

### Executando aplicação

* Para rodar a API:

  ```
  npm start
  ```

* Para rodar os testes da API:

  ```
  npm run test
  ```

Aplicação rodando na porta http://localhost:3333/

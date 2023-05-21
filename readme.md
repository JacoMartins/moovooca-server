# Documentação Movooca

## Introdução

Este documento tem como objetivo orientar o usuário na execução do projeto Movooca, que utiliza Next.js no frontend e Flask-Python no backend.

O projeto Moovooca é uma aplicação web que visa melhorar a gerência e a pesquisa de várias linhas de ônibus, com intuito de chegar ao campus de uma faculdade de preferência. O frontend foi desenvolvido utilizando o framework NextJS, e no backend foi utilizado Python com o framework Flask. Além disso, a aplicação utiliza um banco de dados PostgreSQL para armazenar as informações necessárias.

Abaixo, segue a lista das bibliotecas utilizadas no projeto:

Frontend (NodeJS):

- NextJS
- Radix
- Google Maps React
- Axios para chamadas à API
- MomentJS para gerênciamento de datas
- Nookies
- Phosphor React (Ícones)
- React CSV para exportação de dados no dashboard admin
- React Modal

Backend (Python):

- Flask
- Flask MSearch
- Flask Smorest
- Flask Cors
- Flask JWT
- Python Dotenv
- SqlAlchemy
- Bcrypt
- Numpy 1.21.3
- OpenAI 0.19.0
- OpenPyxl 3.0.9
- Pandas 1.3.4
- Pandas Stubs 1.2.0.35

## Pré-requisitos

Para executar o projeto, é necessário ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados em sua máquina.

## Executando o projeto

1. Faça o download do código fonte do projeto através do GitHub ou do repositório fornecido pelo desenvolvedor.
2. Abra o terminal na pasta raiz do projeto.
3. Execute o comando `docker-compose up --build` ou `docker compose up -d`.
4. Aguarde até que o Docker Compose baixe e crie as imagens necessárias e ligue os containers da aplicação.
5. Acesse a aplicação através do endereço `http://localhost:3000` em seu navegador.

Caso deseje encerrar a execução do projeto, basta executar o comando `docker compose down`.

## Considerações finais

Este documento apresenta a documentação do projeto Movooca, que é uma aplicação web que utiliza Next.js no frontend e Flask-Python no backend. O objetivo da aplicação é melhorar a gerência e a pesquisa de várias linhas de ônibus, com intuito de chegar ao campus de uma faculdade de preferência.

São apresentadas as bibliotecas utilizadas tanto no frontend quanto no backend, os pré-requisitos necessários para a execução do projeto e instruções para executar o projeto utilizando Docker Compose.

Em caso de dúvidas, consulte a documentação do Docker ou entre em contato com o desenvolvedor do projeto.
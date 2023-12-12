# Executando o projeto

Clone o projeto no diretório que desejar executando o comando abaixo:

    git clone https://github.com/tarcisioandrade/newsun-challenge.git

## Backend

Entre na pasta `/backend` e instale as dependências com `npm install`;

Crie um banco de dados postgresql local e coloque a string de conexão em um arquivo `.env` seguindo o `.env.example` disponível no repositório;

Execute o comando `npx prisma migrate deploy` para criar as tabelas;

Inicie o servidor com o comando `npm run dev`
>[!NOTE]
>O servidor será executado na porta 3333

## Frontend

Entre na pasta `/frontend` e instale as dependências com `npm install`;

Inicie o o projeto com o comando `npm run dev`

>[!NOTE]
>O servidor deve permanecer ligado para utilizar os recursos disponiveis.

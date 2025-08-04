# Stockwise

Aplicação web desenvolvida para o controle e gestão de estoque. Permite o acompanhamento de produtos, registro de vendas e visualização de métricas de desempenho em um dashboard.

## Configuração de ambiente

Antes de rodar o projeto, copie o arquivo .env.example para **.env** e configure a variável DATABASE_URL conforme seu ambiente:

```bash
cp .env.example .env
```

Se estiver usando o Docker para o banco, a URL deve seguir o padrão:

```bash
postgresql://postgres:suasenha@localhost:5432/nomedobanco
```

Substitua **suasenha** e **nomedobanco** pelos valores usados na criação do container.

## Executando o projeto

### Subindo banco de dados com o Docker Compose

Para facilitar o desenvolvimento, utilize o Docker Compose para criar e iniciar o container PostgreSQL:

```bash
docker-compose up -d
```

Esse comando iniciará o container conforme definido no arquivo docker-compose.yml.

## Aplicando migrations com o prisma

Com o banco ativo, aplique as migrations para criar a estrutura do banco:

```bash
npx prisma migrate deploy
```

Em ambiente de desenvolvimento, você também pode usar:

```bash
npx prisma migrate dev
```

## Instalação

```bash
# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

## Principais tecnologias utilizadas

- **Next.js**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**
- **Shadcn**
- **Tailwindcss**
- **Zod**
- **React Hook Form**

## Deploy

O banco de dados PostgreSQL está hospedado no Neon, um serviço serverless que facilita o gerenciamento e escalabilidade do banco na nuvem.

A aplicação está hospedada na Vercel, aproveitando o ecossistema completo do Next.js para deploy rápido, escalável e com alta performance.

## Interface

Aqui estão algumas imagens da interface da aplicação:

![Dashboard page](https://github.com/user-attachments/assets/0a453b6f-637e-48d2-a42b-12af8f87f0f7)

![Product page](https://github.com/user-attachments/assets/f1788a91-89c9-4180-80bc-b3a91216e2f5)

![Sales page](https://github.com/user-attachments/assets/b0260c23-fc32-41cf-9a2f-e882808e5f0f)

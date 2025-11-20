# Bookly API

## 🌎 Visão Geral
Bookly API é uma aplicação backend desenvolvida em Node.js que oferece uma plataforma completa para gerenciamento de uma biblioteca digital. A API permite o cadastro e gerenciamento de usuários, livros, autores, gêneros literários, avaliações e favoritos, além de oferecer um sistema completo de autenticação JWT.

## ⭐ Contexto
Este projeto foi desenvolvido como parte da disciplina de desenvolvimento backend, com o objetivo de criar uma API RESTful robusta para gestão de biblioteca. O sistema implementa operações CRUD (Create, Read, Update, Delete) para todas as entidades principais, além de recursos avançados como sistema de avaliações com cálculo de média, gerenciamento de favoritos e autenticação segura de usuários.

## 💻 Tecnologias
- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **Sequelize** - ORM para Node.js
- **PostgreSQL** - Banco de dados relacional
- **JWT (jsonwebtoken)** - Autenticação via tokens

## 🗂️ Estrutura de Pastas
```
BooklyAPI/
├── src/
│   ├── auth/                    # Módulos de autenticação
│   │   ├── index.js            
│   │   ├── signin.js           
│   │   ├── ...             
│   ├── controller/              # Controladores das entidades
│   │   ├── author.js
│   │   ├── book.js
│   │   ├── ...
│   ├── middleware/              # Middlewares da aplicação
│   │   └── ...
│   ├── models/                  # Modelos do banco de dados
│   │   ├── index.js            # Configuração do Sequelize
│   │   └── entities/           # Definição das entidades
│   │       ├── author.js
│   │       ├── book.js
│   │       ├── ...
│   ├── routes/                  # Rotas da API
│   │   ├── index.js
│   │   ├── author.js
│   │   ├── ...
│   ├── utils/                   # Utilitários e dados iniciais
│   │   ├── defaultAuthors.js
│   │   ├── ...
│   │   └── db/
│   │       └── populateDb.js   # Script de população do banco
│   └── index.js                                        
├── .env.example                 
├── .gitignore
├── package.json
├── vercel.json                  
└── README.md
```

## 🏠 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd BooklyAPI
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
    - Copie o arquivo [`.env.example`](.env.example) para `.env`
    - Preencha as variáveis de ambiente com base no arquivo `.env.example`

4. Execute o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

### População Inicial do Banco de Dados

Para popular o banco de dados com dados iniciais, configure `ERASE_DATABASE=true` no arquivo [`.env`](.env) e reinicie o servidor. **Atenção:** Isso apagará todos os dados existentes.

### Endpoints Principais

- **Autenticação:**
  - `POST /auth/login` - Login de usuário
  - `POST /auth/register` - Registro de novo usuário
  - `POST /auth/logout` - Logout (requer autenticação)

- **Livros:** `/books`
- **Autores:** `/authors`
- **Gêneros:** `/genders`
- **Usuários:** `/users`
- **Avaliações:** `/reviews`
- **Favoritos:** `/favorites`

Para mais detalhes sobre os endpoints, consulte os arquivos de rotas em [`src/routes/`](src/routes/).
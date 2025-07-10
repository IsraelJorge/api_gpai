# 🐾 API GPAI

## 📖 Introdução
Esta é uma API desenvolvida em Node.js com Fastify para o gerenciamento de animais, usuários, papéis (roles) e upload de imagens. O sistema permite o cadastro, consulta, atualização e remoção de animais e usuários, além de autenticação via JWT e upload de imagens para os registros. O objetivo é fornecer uma base robusta para aplicações que necessitem de controle de acesso e manipulação de dados relacionados a animais e seus responsáveis.

## 🚀 Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd api_gpai
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto e defina a variável `DATABASE_URL` para o SQLite:
     ```env
     DATABASE_URL="file:./dev.db"
     ```
4. **Rode as migrações do banco de dados:**
   ```bash
   npx prisma migrate dev
   ```
5. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor estará disponível em http://localhost:3333

## 🛠️ Tecnologias Utilizadas
- ⚡ [Node.js](https://nodejs.org/)
- 🚀 [Fastify](https://www.fastify.io/)
- 🗃️ [Prisma ORM](https://www.prisma.io/)
- 🗄️ [SQLite](https://www.sqlite.org/)
- 🔐 [JWT](https://jwt.io/)
- 🛡️ [Zod](https://zod.dev/)
- 📝 [TypeScript](https://www.typescriptlang.org/)

## 🗂️ Estrutura do Projeto
```
api_gpai/
├── src/
│   ├── controllers/      # Lógica dos endpoints (Animal, User, Role, Upload)
│   ├── database/         # Configuração do Prisma e schemas de validação
│   ├── routes/           # Definição das rotas da API
│   ├── utils/            # Funções utilitárias (ex: manipulação de arquivos, senhas)
│   └── server.ts         # Inicialização do servidor Fastify
├── prisma/
│   ├── schema.prisma     # Modelos do banco de dados
│   └── migrations/       # Migrações do banco
├── uploads/              # Arquivos enviados via upload
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração do TypeScript
└── vercel.json           # Configuração de deploy na Vercel
```

### 🔗 Principais Endpoints
- 🔑 `POST /login` — Autenticação de usuário
- 👤 `GET/POST/PUT/DELETE /user` — Gerenciamento de usuários
- 🐶 `GET/POST/PUT/DELETE /animal` — Gerenciamento de animais
- 🏷️ `GET /roles` — Listagem de papéis
- 📤 `POST /upload` — Upload de imagens

## 🤝 Contribuição
Contribuições são bem-vindas! Se você deseja sugerir melhorias, reportar bugs ou enviar novas funcionalidades, abra uma issue ou envie um pull request. Sinta-se à vontade para colaborar e tornar este projeto ainda melhor. 🚀 
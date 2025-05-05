![em desenvolvimento](https://img.shields.io/badge/status-em_desenvolvimento-yellow?style=for-the-badge&logo=github)

# 🐾 Adopet API - Fastify

Bem-vindo à **Adopet API**, uma aplicação desenvolvida com [Fastify](https://fastify.dev/) para gerenciar adoções de pets. Este projeto foi criado como parte do desafio **Alura Challenge Backend 6ª edição**.

## 📦 Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/michelsandre/adopet-api-fastify.git
   cd adopet-api-fastify
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```bash
   PORT=8080
   DATABASE_URL="file:./db/dev.db"
   ```

4. Execute as migrações do Prisma para criar o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. (Opcional) Popule o banco de dados com dados iniciais:

   ```bash
   npx prisma db seed
   ```

6. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

Abra [http://localhost:8080](http://localhost:8080) para acessar a API.

## 🚀 Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

#### `npm run dev`

Inicia o aplicativo em modo de desenvolvimento.\
Abra [http://localhost:8080](http://localhost:8080) para visualizar no navegador.

#### `npm start`

Inicia o aplicativo em modo de produção.

#### `npm run test`

Executa os testes da aplicação.

## 📚 Estrutura do Projeto

- **`src/routes`**: Contém as rotas da aplicação, organizadas por módulos como `tutores`, `pets`, `abrigos` e `adocao`.
- **`src/plugins`**: Plugins globais para funcionalidades como validação e tratamento de erros.
- **`prisma`**: Configuração do banco de dados e scripts de seed.

## 🛠️ Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente.
- **Prisma**: ORM para manipulação do banco de dados.
- **Zod**: Validação de esquemas de dados.
- **TypeScript**: Tipagem estática para JavaScript.

## 🌐 Endpoints

#### Tutores

- **GET `/tutores`**: Retorna todos os tutores cadastrados.
- **GET `/tutores/:id`**: Retorna os detalhes de um tutor específico pelo ID.
- **POST `/tutores`**: Cria um novo tutor. Campos obrigatórios: `nome`, `email`, `senha`.
- **PATCH `/tutores/:id`**: Atualiza os dados de um tutor específico pelo ID.
- **DELETE `/tutores/:id`**: Remove um tutor específico pelo ID.

#### Pets

- **GET `/pets`**: Retorna todos os pets disponíveis para adoção.
- **GET `/pets/todos`**: Retorna todos os pets cadastrados, incluindo os já adotados.
- **GET `/pets/:id`**: Retorna os detalhes de um pet específico pelo ID.
- **POST `/pets`**: Cria um novo registro de pet. Campos obrigatórios: `nome`, `descricao`, `idade`, `endereco`, `imagem`.
- **PATCH `/pets/:id`**: Atualiza os dados de um pet específico pelo ID.
- **PATCH `/pets/:petId/:abrigoId`**: Atribui um pet a um abrigo.
- **DELETE `/pets/:id`**: Remove um pet específico pelo ID.

#### Abrigos

- **GET `/abrigos`**: Retorna todos os abrigos cadastrados.
- **GET `/abrigos/:id`**: Retorna os detalhes de um abrigo específico pelo ID, incluindo os pets sob seus cuidados.
- **POST `/abrigos`**: Cria um novo abrigo. Campo obrigatório: `nome`.
- **PATCH `/abrigos/:id`**: Atualiza os dados de um abrigo específico pelo ID.
- **DELETE `/abrigos/:id`**: Remove um abrigo específico pelo ID.

#### Adoções

- **GET `/adocao`**: Retorna todos os registros de adoção.
- **POST `/adocao/:tutorId/:petId`**: Cria um registro de adoção, alterando o status do pet para `adotado: true`.
- **DELETE `/adocao/:id/:abrigoId`**: Remove um registro de adoção, alterando o status do pet para `adotado: false`.

## 📂 Estrutura de Arquivos

```plaintext
adopet-api-fastify/
├── prisma/              # Configuração e seed do banco de dados
├── requisicoes/         # Exemplos de requisições HTTP
├── src/
│   ├── interfaces/      # Interfaces compartilhadas
│   ├── plugins/         # Plugins globais do Fastify
│   ├── routes/          # Rotas organizadas por módulos (tutores, pets, etc.)
│   ├── shared/          # Utilitários e schemas compartilhados
│   ├── utils/           # Funções utilitárias
│   ├── app.ts           # Configuração principal do Fastify
├── .env                 # Variáveis de ambiente
├── package.json         # Configurações do projeto e dependências
├── tsconfig.json        # Configuração do TypeScript
├── README.md            # Documentação do projeto
```

Exemplo para o arquivo `.env`

```bash
# Define a porta que o servidor deverá inicializar
PORT=8080
# Define o endereço do banco de dados, no caso será SQLite. Se não existir, será criado.
DATABASE_URL="file:./db/dev.db"
```

## 🧪 Testes de Requisição

Recomenda-se a instalação da extensão `REST Client` para testar as requisições HTTP. Arquivos de exemplo estão disponíveis na pasta `requisicoes`.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Feito com ❤️ por [André Michels](https://github.com/michelsandre).

# API de Usuarios Com Autenticação JWT

## Sobre
Esta é uma API para gerenciar usuários utilizando Express e autenticação JWT. A API permite realizar operações CRUD (Criar, Ler, Atualizar, Deletar) em usuários e autenticação de rotas.

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/ithaloDev/app-de-usuarios-com-jwt.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd app-de-usuarios-com-jwt
    ```

3. Instale as dependências:
    ```sh
    npm install
    ```

4. Configure as variáveis de ambiente:

5. Execute a aplicação:
    ```sh
    npm run dev
    ```

## Endpoints

### Autenticação

- **Login**
    - **URL:** `/user/login`
    - **Método:** `GET`
    - **Descrição:** Autentica um usuário e retorna um token JWT.
    - **Corpo da Requisição:**
        ```json
        {
            "name": "string",
            "password": "string"
        }
        ```
    - **Resposta de Sucesso:**
        ```json
        {
            "token": "string"
        }
        ```

### Usuários

- **Criar Usuário**
    - **URL:** `/users/`
    - **Método:** `POST`
    - **Descrição:** Cria um novo usuário.
    - **Corpo da Requisição:**
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string"
        }
        ```
    - **Resposta de Sucesso:**
        ```json
        {
            "id": "string",
            "name": "string",
            "email": "string"
        }
        ```

- **Listar Todos os Usuários**
    - **URL:** `/users/`
    - **Método:** `GET`
    - **Descrição:** Retorna uma lista de todos os usuários.
    - **Resposta de Sucesso:**
        ```json
        [
            {
                "id": "string",
                "name": "string",
                "email": "string"
            }
        ]
        ```

- **Buscar Usuário por ID**
    - **URL:** `/users/:id`
    - **Método:** `GET`
    - **Descrição:** Retorna um usuário específico pelo ID.
    - **Resposta de Sucesso:**
        ```json
        {
            "id": "string",
            "name": "string",
            "email": "string"
        }
        ```

- **Deletar Usuário por ID**
    - **URL:** `/users/:id`
    - **Método:** `DELETE`
    - **Descrição:** Deleta um usuário específico pelo ID. Requer autenticação.
    - **Resposta de Sucesso:**
        ```json
        {
            "msg": "Usuário deletado com sucesso"
        }
        ```

- **Atualizar Usuário por ID**
    - **URL:** `/users/:id`
    - **Método:** `PUT`
    - **Descrição:** Atualiza um usuário específico pelo ID. Requer autenticação.
    - **Corpo da Requisição:**
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string"
        }
        ```
    - **Resposta de Sucesso:**
        ```json
        {
            "id": "string",
            "name": "string",
            "email": "string"
        }
        ```

## Ferramentas Necessárias
- Node.js
- Express
- TypeScript
- Prisma
- MongoDB

## Observações
- Certifique-se de ter o MongoDB configurado e rodando.
- Utilize o token JWT retornado no login para acessar as rotas protegidas.

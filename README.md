
## 📦 Cadastro de Produtos
Uma aplicação dinâmica e intuitiva para o gerenciamento de inventário, desenvolvida com Node.js. O projeto utiliza Handlebars para a renderização de visualizações no servidor e Bootstrap 5 para garantir uma interface moderna, organizada e totalmente responsiva.

## 🚀 Funcionalidades
Gerenciamento Completo (CRUD): Cadastre, visualize, edite e remova produtos de forma simplificada.

Interface Moderna: Design limpo e profissional utilizando os componentes mais recentes do Bootstrap 5.

Renderização Dinâmica: Páginas geradas no servidor com Handlebars para carregamento eficiente.

Validação de Formulários: Filtros para garantir que nenhum produto seja cadastrado com informações incompletas.

Feedback ao Usuário: Notificações de sucesso ou erro após cada operação de gerenciamento.

Responsividade Total: Adaptado para uso em dispositivos móveis e desktops.

## 🛠️ Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript no lado do servidor.

Express.js: Framework ágil para estruturação de rotas e middlewares.

Handlebars (HBS): View engine poderosa para criação de templates HTML dinâmicos.

Bootstrap 5: Framework CSS para estilização rápida, moderna e responsiva.

Banco de Dados: (Ex: MySQL/Sequelize ou MongoDB) para persistência das informações dos produtos.

JavaScript (ES6+): Lógica de controle e manipulação de dados.

## 📦 Como rodar o projeto
Clone o repositório:

Bash

git clone https://github.com/mvdevelop/cadastro-de-produtos.git
cd cadastro-de-produtos
Instale as dependências:

Bash

npm install
Configuração do Banco de Dados: Certifique-se de configurar suas credenciais no arquivo correspondente (ou .env) antes de iniciar.

Inicie a aplicação:

Bash

npm start # ou npm run dev
Acesse: http://localhost:3000

## 📂 Estrutura de Pastas
Plaintext

cadastro-de-produtos/
├── public/           # Arquivos estáticos (CSS, imagens, JS do cliente)
├── src/
│   ├── controllers/  # Lógica de recebimento e envio de dados
│   ├── models/       # Definição da estrutura dos produtos
│   ├── routes/       # Definição dos caminhos da aplicação
│   └── views/        # Templates Handlebars (.handlebars ou .hbs)
│       ├── layouts/  # Template principal (main)
│       └── partials/ # Componentes reutilizáveis
├── server.js         # Arquivo principal do servidor
└── package.json      # Dependências e scripts

## 🎨 Preview da Interface
Nota: Adicione aqui uma captura de tela do formulário de cadastro ou da tabela de produtos (ex: Tabela estilizada com botões coloridos do Bootstrap).

## 👨‍💻 Autor
Desenvolvido com ❤️ por mvdevelop.

GitHub: @mvdevelop

## 📄 Licença
Este projeto é para fins educacionais e está sob a licença MIT.

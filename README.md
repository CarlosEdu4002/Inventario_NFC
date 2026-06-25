# 📦 Sistema de Inventário NFC

Um sistema simples e moderno para controle de ativos patrimoniais utilizando tags NFC.

O projeto permite cadastrar, listar e visualizar ativos, além de abrir diretamente a página de um item específico através da leitura de uma tag NFC.

## 🚀 Funcionalidades

📄 Listagem de todos os ativos

🔍 Visualização de um ativo específico por ID

📱 Integração com leitura NFC

🌐 API REST com Node.js + Express

🎨 Interface web responsiva

⚡ Inicialização simples com PM2 ou arquivo .bat

## 🛠️ Tecnologias utilizadas

Frontend

HTML5

CSS3

JavaScript

Backend

Node.js

Express

CORS

## 📂 Estrutura do projeto

SistemaNFC/

├── backend/

│ ├── server.js

│ └── ativos.json

├── frontend/

│ ├── index.html

│ ├── exibeAtivos.html

│ ├── ativo.html

│ ├── css/

│ └── js/

├── package.json

└── README.md

## ⚙️ Instalação

1. Clone o repositório

bash

git clone 
https://github.com/CarlosEdu4002/Inventario_NFC.git

cd Inventario_NFC

2. Instale as dependências

bash

npm install

3. Inicie o servidor

bash

node server.js

O sistema ficará disponível em:

http://localhost:3000

## 📱 Fluxo com NFC

Alternativa 1

A leitura da tag NFC abre diretamente a página do ativo:

http://localhost:3000/ativo.html?id=123

Alternativa 2

O usuário acessa o sistema e seleciona manualmente o ativo desejado.

## ▶️ Executar automaticamente

Você pode iniciar o sistema com PM2:

bash

npm install -g pm2

pm2 start server.js --name inventario-nfc

pm2 save

Ou criar um arquivo iniciar.bat:

(Já criado em Exec, apenas mude o caminho)

pause

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido para facilitar o controle de patrimônio e inventário utilizando etiquetas NFC, permitindo consultas rápidas e redução de erros no processo de identificação de ativos.

## 📸 Futuras melhorias

📷 Upload de fotos dos ativos

👤 Sistema de usuários

📊 Dashboard com relatórios

☁️ Banco de dados MySQL/PostgreSQL


## 👨‍💻 Autor

Carlos Carvalho

Projeto desenvolvido para estudos e aplicação prática em controle patrimonial com NFC.

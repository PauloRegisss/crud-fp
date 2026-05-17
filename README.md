# CRUD FP

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge\&logo=next.js\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000?style=for-the-badge\&logo=bun\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)

Projeto Full Stack utilizando monorepo com Bun, frontend em Next.js e backend em FastAPI.

</div>

---

# 📚 Tecnologias Utilizadas

## Frontend

* Next.js
* TypeScript
* React
* Biome

## Backend

* FastAPI
* Python
* Uvicorn

## Monorepo

* Bun Workspaces

---

# 📁 Estrutura do Projeto

```txt
crud/
├── apps/
│   ├── frontend/     # Aplicação Next.js
│   └── backend/      # API FastAPI
│
├── package.json
├── bun.lock
├── biome.json
└── README.md
```

---

# ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado:

* Bun
* Python 3.11+
* Git

---

# 🚀 Instalando o Bun

## Linux / macOS

Execute:

```bash
curl -fsSL https://bun.sh/install | bash
```

Depois reinicie o terminal.

Verifique a instalação:

```bash
bun --version
```

---

## Windows

Instale através do PowerShell:

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Verifique:

```powershell
bun --version
```

---

# 🐍 Instalando o Python

Baixe:

* [https://www.python.org/downloads/](https://www.python.org/downloads/)

Verifique:

```bash
python --version
```

ou:

```bash
python3 --version
```

---

# 📥 Clonando o Projeto

```bash
git clone https://github.com/PauloRegisss/crud-fp.git
```

Entre na pasta:

```bash
cd crud-fp
```

---

# 📦 Instalando as Dependências

## Frontend

Na raiz do projeto:

```bash
bun install
```

---

## Backend

Entre na pasta do backend:

```bash
cd apps/backend
```

Crie o ambiente virtual:

### Linux / macOS

```bash
python3 -m venv .venv
```

### Windows

```powershell
python -m venv .venv
```

---

## Ativando o ambiente virtual

### Linux / macOS

```bash
source .venv/bin/activate
```

### Windows

```powershell
.venv\Scripts\activate
```

---

## Instalando dependências Python

```bash
pip install -r requirements.txt
```

---

# 🧪 Rodando o Projeto em Desenvolvimento

Volte para a raiz:

```bash
cd ../..
```

Execute:

```bash
bun run dev
```

Isso irá iniciar:

* Frontend Next.js
* Backend FastAPI

---

# 🌐 Endereços da Aplicação

## Frontend

```txt
http://localhost:3000
```

---

## Backend

```txt
http://127.0.0.1:8000
```

---

## Swagger da API

```txt
http://127.0.0.1:8000/docs
```

---

# 🏗️ Build de Produção

Execute:

```bash
bun run build
```

---

# ▶️ Rodando em Produção

Execute:

```bash
bun run start
```

---

# 🧹 Lint e Formatação

## Verificar código

```bash
bun run lint
```

---

## Formatar código

```bash
bun run format
```

---

# 🧠 Sobre o Projeto

Este projeto foi desenvolvido utilizando uma arquitetura monorepo moderna com:

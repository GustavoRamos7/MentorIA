# 🧠 MentorIA

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![React](https://img.shields.io/badge/react-18-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Projeto **fullstack de Mentoria com Inteligência Artificial**, criado para ajudar estudantes e pessoas em transição de carreira que **não sabem por onde começar** a construir sua vida profissional.

O MentorIA analisa informações pessoais, interesses e objetivos do usuário e, com apoio de IA, gera um **perfil vocacional detalhado** e um **roadmap de estudos totalmente personalizado**.

---

## 🎯 Objetivo

Ajudar pessoas que:

* Estão saindo do ensino médio
* Estão perdidas profissionalmente
* Querem mudar de área
* Não sabem o que estudar nem por onde começar

Tudo isso unindo **tecnologia, mentoria humana e inteligência artificial**.

---

## 🚀 Funcionalidades

### 👩‍🎓 Área do Aluno

* Cadastro com informações pessoais e profissionais
* Análise vocacional com IA
* Geração automática de:

  * Perfil vocacional
  * Roadmap de estudos personalizado
* Trilhas ajustadas de acordo com interesses, habilidades e objetivos

### 👨‍🏫 Área do Mentor / Admin

* Acesso restrito apenas para e-mails da organização (`@mentoria.com`)
* Visualização dos alunos cadastrados
* Criação e direcionamento de trilhas de estudo
* Trilhas **dinâmicas**, geradas por IA e adaptadas individualmente para cada aluno

### 🤖 Inteligência Artificial

* Leitura e interpretação dos dados do aluno
* Geração de textos personalizados
* Roadmaps únicos, nunca genéricos
* Adequação contínua conforme novos direcionamentos

---

## 🖥️ Telas do Sistema

* Página inicial com informações sobre o projeto
* Seção institucional (Sobre nós)
* Área dedicada para alunos
* Área dedicada para mentores/professores

---

## 📁 Estrutura do Projeto

```
MentorIA/
├── mentorIA-backend/      # Backend (Node.js, APIs, regras de negócio)
├── mentoria-frontend/    # Frontend (React)
├── .gitignore
└── README.md
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

* Node.js
* Express
* Autenticação JWT
* Integração com IA (ex: OpenAI / GPT)
* Controle de acesso por domínio de e-mail

### Frontend

* React
* Componentização
* Consumo de API REST

*(Banco de dados e outras libs podem ser ajustadas conforme evolução do projeto)*

---

## ⚙️ Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

* Node.js >= 18
* NPM ou Yarn

### ▶️ Backend

```bash
cd mentorIA-backend
npm install
npm run dev
```

### ▶️ Frontend

```bash
cd mentoria-frontend
npm install
npm start
```

---

## 🧪 Fluxo de Uso

1. Aluno realiza cadastro no sistema
2. Preenche informações pessoais, interesses e objetivos
3. IA gera perfil vocacional + roadmap
4. Mentor acessa painel administrativo
5. Mentor direciona ou ajusta trilhas personalizadas
6. IA adapta a trilha conforme o perfil do aluno

---

## 📌 Status do Projeto

🚧 Em desenvolvimento

Próximos passos:

* Melhorar UX/UI
* Implementar histórico de evolução do aluno
* Dashboard com métricas
* Testes automatizados

---

## 🤝 Contribuições

Contribuições são bem-vindas!

* Abra uma *issue* para sugestões ou bugs
* Envie um *pull request* com melhorias

---

## 📜 Licença

Este projeto está sob a licença **MIT**.

---

## 👤 Autor

**Gustavo Ramos**
Estudante de Ciência da Computação e Analista de Suporte em transição para Desenvolvimento 🚀

> Projeto criado com foco em impacto real, orientação e futuro profissional.

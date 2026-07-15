# 🧠 Planej.ai
### Projeto desafio do bootcamp Santander 2026 - AI React Front-end pela DIO
O Planej.ai é uma aplicação web de planejamento financeiro pessoal. O usuário preenche um formulário com informações sobre sua renda, gastos e uma meta financeira (como uma viagem ou a compra de um bem), e a aplicação usa inteligência artificial para gerar um diagnóstico personalizado com sugestões práticas, ideias de renda extra e um plano de ação.

Tudo funciona diretamente no navegador: sem backend, sem banco de dados remoto. Os dados são salvos no localStorage e as análises são geradas em tempo real pela API do Google Gemini.
### Repositório original: https://github.com/digitalinnovationone/planejai


## 🛠️ Stacks
- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: nenhum
- **Database**: Local Storage
- **AI Tools**: Gemini API
- **Build Tools**: Vite
- **Type Checker**: TypeScript

## 📦 Instalação

1. Clonar o repositprio usando `git clone`.
2. Instalar dependências com `npm install`.
3. mudar variável de ambiente para uma chave de api do gemini válida no arquivo .env.local.
4. Iniciar o servidor com `npm run dev`.


## 📂 Project Structure
```markdown
.
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes.tsx
│   ├── hooks
│   │   ├── useInsight.tsx
│   │   ├── useSimulationStorage.tsx
│   │   └── useTheme.tsx
│   ├── services
│   │   └── aiService.ts
│   ├── utils
│   │   └── simulations.ts
│   └── context
│       └── theme
│           ├── ThemeContext.tsx
│           └── ThemeProvider.tsx
├── vite.config.ts
└── tsconfig.json
```


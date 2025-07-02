# 🎮 Batalha de Monstros - Revi Challenge

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

Uma aplicação de batalha de monstros desenvolvida em **Next.js ** com **React 19** e **TypeScript 5**, seguindo princípios de clean code e boas práticas. Cadastre monstros com diferentes atributos e faça-os batalhar entre si!

## 📍 Repositório

🔗 **GitHub**: [https://github.com/caiquestow/revi-TEST](https://github.com/caiquestow/revi-TEST)

---

## 🚀 Como Rodar a Aplicação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/caiquestow/revi-TEST.git
cd revi-TEST
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute a aplicação:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:3000
```

## 🎯 Funcionalidades

### Cadastro de Monstros
- **Nome**: Identificação única do monstro
- **Ataque**: Poder de ataque (1-99)
- **Defesa**: Capacidade de defesa (1-99)
- **Velocidade**: Determina quem ataca primeiro (1-99)
- **HP**: Pontos de vida (1-999)
- **Imagem**: Gerada automaticamente via Dicebear API
  - Múltiplos temas (adventurer, avataaars, big-ears, bottts, croodles, fun-emoji)
  - Baseada no nome do monstro para consistência
  - Botão para gerar nova imagem
  - Prévia em tempo real

### Sistema de Batalha
- **Seleção**: Escolha dois monstros para batalhar
- **Algoritmo**: Segue regras específicas de combate
- **Animações**: Rounds animados com feedback visual
- **Resultado**: Exibição automática do vencedor
- **Sons**: Efeitos sonoros durante a batalha
- **Acelerar Tempo**: Botão para pular animações e ir direto ao resultado
- **Confetti**: Efeito visual na vitória
- **Notificações**: Toasts informativos durante a batalha

### Algoritmo de Batalha
1. **Primeiro ataque**: Monstro com maior velocidade
2. **Empate de velocidade**: Monstro com maior ataque
3. **Cálculo de dano**: `attack - defense` (mínimo 1)
4. **Rounds**: Continua até um HP chegar a zero
5. **Vencedor**: Quem reduz o HP do inimigo a zero primeiro

## 🛠️ Tecnologias Utilizadas

- **Next.js 15.3.4** com App Router e Turbopack
- **React 19.0.0** com TypeScript 5
- **Framer Motion 12.23.0** para animações
- **React Hot Toast 2.5.2** para notificações
- **React Confetti 6.4.0** para efeitos visuais
- **Web Audio API** para sons nativos
- **Dicebear API** para geração de avatares
- **Tailwind CSS 4** para estilização

## 📁 Estrutura do Projeto

```
src/
├── app/                     # Páginas Next.js
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout da aplicação
│   └── page.tsx             # Página principal
├── components/              # Componentes React
│   ├── BattleArena.tsx      # Arena de batalha
│   ├── MonsterForm.tsx      # Formulário de cadastro
│   ├── MonsterList.tsx      # Lista de monstros
│   └── HomeClient.tsx       # Cliente da página principal
├── contexts/                # Contextos React
│   └── MonstersContext.tsx  # Gerenciamento de estado global
├── hooks/                   # Hooks customizados
│   ├── useAudio.ts          # Gerenciamento de áudio
│   └── useTimeouts.ts       # Gerenciamento de timeouts
└── utils/                   # Utilitários
    └── battleLogic.ts       # Lógica de batalha
```

## 🎨 Características do Design

- **Tema escuro** com gradientes e efeitos visuais
- **Animações suaves** e responsivas
- **Interface intuitiva** e moderna
- **Feedback visual** em tempo real
- **Sons de batalha** para imersão
- **Confetti** na vitória para celebração

## 🎮 Como Jogar

1. **Cadastre monstros** usando o formulário (imagem gerada automaticamente)
2. **Selecione dois monstros** na lista
3. **Inicie a batalha** na arena
4. **Acompanhe os rounds** ou acelere o tempo
5. **Veja o resultado** e o resumo da batalha

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 🏗️ Arquitetura e Boas Práticas

### Princípios Aplicados
- **Single Responsibility**: Cada arquivo tem uma responsabilidade clara
- **DRY (Don't Repeat Yourself)**: Hooks reutilizáveis
- **Clean Code**: Nomes descritivos, funções pequenas
- **Separation of Concerns**: Lógica separada da UI
- **Performance**: Cleanup automático, gerenciamento eficiente

### Hooks Customizados
- **useAudio**: Gerencia contexto de áudio e reprodução de sons
- **useTimeouts**: Gerencia timeouts com cleanup automático

### Utilitários
- **battleLogic**: Lógica de batalha isolada e testável
- **Geração de avatares**: Integração com Dicebear API

### Sistema de Áudio
- **Web Audio API nativa**: Sons criados programaticamente
- **Contexto de áudio**: Ativado na primeira interação do usuário
- **Sons disponíveis**: Ataque e vitória
- **Retomada automática**: Após suspensão do contexto

## 📝 Observações

- **Sem backend**: Aplicação totalmente frontend
- **Dados em memória**: Armazenamento local via Context API
- **Imagens automáticas**: Geradas via Dicebear API
- **Sons nativos**: Criados via Web Audio API
- **Responsivo**: Funciona em diferentes tamanhos de tela

## 🚀 Diferenciais

- **Código limpo** e bem estruturado
- **Performance otimizada** com cleanup automático
- **Experiência imersiva** com sons e animações
- **Interface moderna** com tema escuro
- **Geração automática** de avatares únicos

## 🚀 Status do Projeto

✅ **Concluído** - Todas as funcionalidades implementadas e testadas
✅ **Responsivo** - Funciona em desktop, tablet e mobile
✅ **Performance** - Otimizado com Turbopack e cleanup automático
✅ **Acessibilidade** - Interface intuitiva e navegável

## 📱 Deploy

🌐 **Live Demo**: [Em breve]

---

Desenvolvido com ❤️ para o desafio técnico da Revi

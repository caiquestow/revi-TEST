# Batalha de Monstros - Revi Desafio

Uma aplicação de batalha de monstros desenvolvida em **Next.js** (**React** e **TypeScript**).

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
  - Botão para gerar nova imagem

### Sistema de Batalha
- **Seleção**: Escolha dois monstros para batalhar
- **Algoritmo**: Segue regras específicas de combate
- **Animações**: Rounds animados com feedback visual
- **Resultado**: Exibição automática do vencedor
- **Sons**: Efeitos sonoros durante a batalha
- **Acelerar Tempo**: Botão para pular animações e ir direto ao resultado
- **Confetti**: Efeito visual na vitória
- **Notificações**: Toasts durante a batalha

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


## 🎮 Como Jogar

1. **Cadastre monstros** usando o formulário (imagem gerada automaticamente)
2. **Selecione dois monstros** na lista
3. **Inicie a batalha** na arena
4. **Acompanhe os rounds** ou acelere o tempo
5. **Veja o resultado** e o resumo da batalha

## 🚀 Diferenciais

- **Experiência** com sons e animações
- **Geração automática** de avatares

---
# Pokédex

Aplicação web para explorar Pokémon, construída com **React + TypeScript** e consumindo a [PokéAPI](https://pokeapi.co/).

As anotações de cada Pokémon são salvas pela [Pokédex Notes API](https://github.com/Synndm/pokedex-notes-api), um backend separado em Node.js + Express.

<!-- Dica: tire um print da tela, salve em docs/screenshot.png e descomente a linha abaixo -->
<!-- ![Tela da Pokédex](docs/screenshot.png) -->

## Funcionalidades

- Listagem dos 50 primeiros Pokémon com imagem, número e tipos
- Busca por **nome ou número**, com mensagem de erro quando não encontrado
- Botão para voltar à lista completa após uma busca
- Modal de detalhes com altura, peso, habilidades (incluindo ocultas) e status base
- Visualizador de sprites: frente, costas e versões shiny
- **Anotações por Pokémon** (criar, listar, editar e excluir), salvas na Notes API
- Cores por tipo de Pokémon
- Layout responsivo (desktop e celular)
- Acessível por teclado: cards focáveis, modal fecha com `Esc` e devolve o foco ao card

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Sass (SCSS)](https://sass-lang.com/) com metodologia BEM
- [Oxlint](https://oxc.rs/) para lint

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) 20.19 ou superior.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Entre na pasta do projeto
cd pokedex

# 3. Instale as dependências
npm install

# 4. Rode em modo de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Anotações (backend)

As anotações dependem da [Notes API](https://github.com/Synndm/pokedex-notes-api). Rode-a em outro terminal (veja o README dela). Por padrão, o front procura a API em `http://localhost:3333`.

Para apontar para outro endereço (ex.: a API publicada), crie um arquivo `.env.local`:

```bash
VITE_API_URL=https://sua-api.onrender.com
```

### Outros comandos

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm run build`   | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão de produção      |
| `npm run lint`    | Analisa o código com o Oxlint              |

## Estrutura do projeto

```
src/
├── components/     # Componentes de interface (cada um com seu .tsx e .scss)
│   ├── PokeCard/
│   ├── PokeGrid/
│   ├── PokeModal/
│   ├── PokeStatus/
│   ├── PokemonAbilities/
│   ├── PokemonNotes/
│   ├── SearchBar/
│   └── SpriteViewer/
├── services/       # Comunicação com a PokéAPI e com a Notes API
├── styles/         # Reset, variáveis e estilos globais
├── types/          # Tipagens TypeScript das respostas da API
├── App.tsx         # Componente principal (estado da aplicação)
└── main.tsx        # Ponto de entrada
```

## Decisões técnicas

- **Camada de serviço separada (`services/pokeapi.ts`)**: os componentes não sabem como os dados são buscados. Se a API mudar, só esse arquivo muda.
- **Tipagem só dos campos usados**: a resposta da PokéAPI é enorme; tipar apenas o necessário mantém os tipos legíveis e ainda garante segurança onde importa.
- **`Promise.all` para os detalhes**: o endpoint de listagem só retorna nome e URL, então busco os detalhes de todos os Pokémon **em paralelo**, em vez de um por vez.
- **Estado derivado no `SpriteViewer`**: guardo apenas o sprite selecionado (label) e calculo a imagem a partir dele, evitando dois estados que poderiam ficar dessincronizados.
- **Card clicável acessível**: o card usa um `<button>` no nome com a área de clique estendida via `::after`, o que mantém o HTML semântico e permite navegação por teclado.
- **Anotações em um backend próprio**: o front fala com a Notes API, que valida os dados e esconde a URL do banco (crudcrud). A URL da API vem de variável de ambiente (`VITE_API_URL`).
- **SCSS com BEM e variáveis**: cores e breakpoints centralizados em `_variables.scss`.

## Próximos passos

O que eu faria com mais tempo:

- [ ] Paginação ou "carregar mais" (o serviço já aceita `limit` e `offset`)
- [ ] Filtro por tipo
- [ ] Extrair a lógica de busca para um custom hook (`usePokemons`)
- [ ] Cache das requisições (ex.: TanStack Query) para não buscar a lista de novo ao limpar a busca
- [ ] Usar `Promise.allSettled` para que a falha de um Pokémon não derrube a lista toda
- [ ] Testes com Vitest e Testing Library

# RETROTOYZ

Enciclopedia e collezione personale dei giocattoli vintage **1980-2005**.

Stile arcade/neon con tema scuro. Cerca, esplora e costruisci la tua collezione nostalgica.

## Funzionalita

- **Catalogo** con 370+ giocattoli (action figures, costruzioni, bambole, veicoli, elettronici, peluche e altro)
- **Ricerca e filtri** per nome, brand, categoria, periodo
- **La Mia Cameretta** — pagina collezione personale con sfondo illustrato
- **Aggiungi giocattoli** in 3 modi: manuale, ricerca AI (DeepSeek), ricerca LEGO (Rebrickable API)
- **Timeline interattiva** 1980-2005 con link ai giocattoli iconici
- **Persistenza locale** via localStorage

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS 4
- React Router 7
- Lucide React (icone)
- Playwright (test E2E)

## Setup

```bash
npm install
npm run dev
```

Apri http://localhost:5173

## Script

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Build produzione |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Test E2E (Playwright) |

## Struttura

```
src/
  components/    # Header, ToyCard, CategoryCard, Timeline
  pages/         # HomePage, CatalogPage, ToyDetailPage, CollectionPage, AddToyPage
  hooks/         # useToys (state management localStorage)
  lib/           # constants, api (Rebrickable + DeepSeek), dati per categoria
public/
  cameretta-bg.png   # Sfondo pagina collezione
e2e/
  retrotoyz.spec.js  # 7 test E2E
```

## API esterne (opzionali)

- **Rebrickable** — ricerca set LEGO (key inclusa, read-only)
- **DeepSeek** — generazione schede AI (richiede API key utente)

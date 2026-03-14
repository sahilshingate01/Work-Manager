# Daily Work Manager

A full-stack web application to log daily work notes in card format with AI-generated summaries.

## Stack

- **Monorepo**: pnpm workspaces
- **Frontend**: React + Vite + Tailwind CSS (glassmorphism dark theme)
- **API**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, drizzle-zod
- **AI**: NVIDIA API (llama-3.1-8b-instruct) for work summaries

## Project Structure

```
├── artifacts/
│   ├── daily-work-manager/   # React + Vite frontend
│   └── api-server/           # Express API server
├── lib/
│   ├── api-spec/             # OpenAPI spec + Orval codegen
│   ├── api-client-react/     # Generated React Query hooks
│   ├── api-zod/              # Generated Zod schemas
│   └── db/                   # Drizzle ORM schema + DB connection
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy `.env` and fill in your values:

```bash
cp .env .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NVIDIA_API_KEY` | NVIDIA API key ([get one](https://build.nvidia.com/)) |
| `PORT` | API server port (default: 3001) |

### 3. Set up the database

```bash
# macOS: install PostgreSQL
brew install postgresql@17
brew services start postgresql@17
createdb workmanager

# Push schema
DATABASE_URL="postgresql://$(whoami)@localhost:5432/workmanager" pnpm --filter @workspace/db run push
```

### 4. Start development servers

```bash
./dev.sh
```

- **Frontend** → http://localhost:5173
- **API** → http://localhost:3001

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/works` | List all work entries |
| POST | `/api/works` | Create a work entry |
| GET | `/api/works/:id` | Get single entry |
| PUT | `/api/works/:id` | Update entry |
| DELETE | `/api/works/:id` | Delete entry |
| POST | `/api/ai/summarize` | Generate AI summary |

## Database Schema

**`works` table**: `id`, `title`, `details`, `link` (nullable), `summary` (nullable), `date`, `created_at`, `updated_at`

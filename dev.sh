#!/usr/bin/env bash
# Local development startup script
# Runs API server (port 3001) and Vite frontend (port 5173) in parallel

set -e

# Load .env if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Default ports if not set
export PORT="${PORT:-3001}"
export API_PORT="${API_PORT:-3001}"
export VITE_PORT="${VITE_PORT:-5173}"
export BASE_PATH="${BASE_PATH:-/}"
export NODE_ENV="${NODE_ENV:-development}"

echo "Starting Work Manager in development mode..."
echo "  API Server  → http://localhost:${PORT}"
echo "  Frontend    → http://localhost:${VITE_PORT}"
echo ""

# Run API server and frontend in parallel
trap "kill 0" EXIT

# Start API server
(cd artifacts/api-server && PORT=$PORT DATABASE_URL=$DATABASE_URL NVIDIA_API_KEY=$NVIDIA_API_KEY pnpm run dev) &

# Start frontend (uses PORT for Vite's own port via VITE_PORT override)
(cd artifacts/daily-work-manager && PORT=$VITE_PORT API_PORT=$PORT BASE_PATH=$BASE_PATH pnpm run dev) &

wait

# Install frontend dependencies
install:
	pnpm install

# Start development server
dev:
	pnpm dev

# Build the project
build:
	pnpm build

# Start the production server
start:
	pnpm start

# Run database migrations
migrate:
	npx prisma migrate dev

# Format all frontend files
format:
	npx prettier --write .

# Lint the code
lint:
	pnpm lint

# Remove build artifacts and dependencies
clean:
	rm -rf node_modules .next

# Clean and reinstall everything for frontend
reset: clean
	pnpm install

# Create backend virtual environment
backend-venv:
	cd backend && uv venv

# Install backend dependencies (FastAPI, Uvicorn)
backend-install:
	cd backend && uv pip install fastapi "uvicorn[standard]"

# Save backend dependencies to requirements.txt
backend-freeze:
	cd backend && uv pip freeze > requirements.txt

# Run FastAPI server
backend-run:
	cd backend && uv run uvicorn main:app --reload

# Reset backend: remove venv & recreate
backend-reset:
	rm -rf backend/.venv
	cd backend && uv venv
	cd backend && uv pip install fastapi "uvicorn[standard]"
	cd backend && uv pip freeze > requirements.txt

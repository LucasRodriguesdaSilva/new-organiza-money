# Makefile para Next.js + Docker

.PHONY: help build dev prod up down restart logs shell install lint test

# Mostrar ajuda
help:
	@echo "Comandos disponíveis:"
	@echo "  build     - Construir as imagens Docker"
	@echo "  dev       - Iniciar em modo desenvolvimento"
	@echo "  prod      - Iniciar em modo produção"
	@echo "  up        - Iniciar containers"
	@echo "  down      - Parar containers"
	@echo "  restart   - Reiniciar containers"
	@echo "  logs      - Mostrar logs dos containers"
	@echo "  shell     - Acessar shell do container"
	@echo "  install   - Instalar dependências"
	@echo "  lint      - Executar linting"
	@echo "  test      - Executar testes"

# Construir imagens
build:
	docker compose build

# Modo desenvolvimento
dev:
	docker compose up -d nextjs

# Modo produção
prod:
	docker compose --profile production up -d nextjs-prod

# Iniciar containers
up:
	docker compose up -d

# Parar containers
down:
	docker compose down

# Reiniciar containers
restart:
	docker compose restart

# Mostrar logs
logs:
	docker compose logs -f

# Acessar shell do container (desenvolvimento)
shell:
	docker compose exec nextjs sh

# Instalar dependências
install:
	docker compose exec nextjs npm install

# Executar linting
lint:
	docker compose exec nextjs npm run lint

# Executar testes
test:
	docker compose exec nextjs npm run test

permissions:
	docker compose exec nextjs chown -R www-data:www-data .

# Setup inicial
setup:
	make build
	make dev
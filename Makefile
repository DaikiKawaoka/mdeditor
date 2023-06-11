up:
	docker compose up -d
	docker compose exec front yarn start

up-prod:
	docker compose -f docker-compose.prod.yml up -d

init:
	docker compose up --build -d
	docker compose exec api composer install
	docker compose exec api cp .env.example .env
	docker compose exec api php artisan key:generate
	docker compose exec api php artisan migrate:refresh --seed
	docker compose exec front yarn install
	docker compose exec front yarn start

init-prod:
	docker compose -f docker-compose.prod.yml build
	docker compose -f docker-compose.prod.yml up -d
	docker compose exec api composer install
	docker compose exec api cp .env.production .env
	docker compose exec api php artisan key:generate

build-prod:
	docker compose exec front yarn build REACT_APP_ENV=production

down:
	docker compose down

dbfresh:
	docker compose exec api php artisan migrate:fresh --seed

mvapi:
	docker compose exec api sh

mvfront:
	docker compose exec front sh

mvweb:
	docker compose exec web sh

mvdb:
	docker compose exec db sh

f:
	docker compose exec front yarn prettier --write .
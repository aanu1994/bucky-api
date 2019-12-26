project-up: ## Spins up and builds containers for the bucky api
	@echo "💄 Building and spinning up the containers..."
	docker-compose up -d --build --force-recreate

project-down: ## Stop and remove containers for the bucky api
	@echo "💄 Stopping and removing containers..."
	docker-compose down -v --rmi all

login-bucky-api: ## Log into the bucky api container
	docker-compose exec bucky_api /bin/bash

login-bucky-db: ## Log into the bucky db container
	docker-compose exec bucky_db /bin/bash
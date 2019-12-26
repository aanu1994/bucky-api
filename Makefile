build: ## Spins up and builds containers for the bucky api
	@echo "💄 Building and spinning up the containers..."
	docker-compose up -d --build --force-recreate

destroy: ## Stop and remove containers for the bucky api
	@echo "💄 Stopping and removing containers..."
	docker-compose down -v --rmi all
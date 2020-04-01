project-up: ## Spins up and builds containers for the bucky api
	@echo "Building containers..."
	sudo docker-compose up -d --build --force-recreate

project-down: ## Stop and remove containers for the bucky api
	@echo "Stopping and removing containers..."
	sudo docker-compose down -v --rmi all

login-bucky-api: ## Log into the bucky api container
	sudo docker-compose exec bucky_api /bin/bash

login-bucky-db: ## Log into the bucky_db container
	sudo docker-compose exec bucky_db /bin/bash

push-to-aws: ## Upload built api to ec2
	scp -i ~/Development/ec2key.pem   ec2-user@\[2001:db8:1234:1a00:9691:9503:25ad:1761\]:~

	
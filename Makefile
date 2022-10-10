star-wars-nest-id=$(shell docker ps -q -f name=swapi-backend-dev)
redis=$(shell docker ps -q -f name=redis)

build-dev:
	@docker-compose --profile dev build

build-prod:
	@docker-compose --profile prod build

run-dev:
	@docker-compose --profile dev up -d

run-prod:
	@docker-compose --profile prod up -d

rm-redis:
	@docker rm -f $(redis)

tests:
	@yarn test:unit

tests-coverage:
	@yarn test:unit --coverage

stop: 
	@docker-compose stop

restart-dev: stop run-dev

restart-prod:
	stop run-prod

attach-console:
	@docker logs --since 60s -f --tail 1000 $(star-wars-nest-id)
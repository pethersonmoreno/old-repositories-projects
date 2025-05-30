# NestJS with DDD - Pokemon Trainer

A NestJS project with DDD. The pokemon trainer user can register pokemons, remove and update them.

## Installation

```bash
$ npm install
```

## Configure local database

```bash
# start local mongodb with the command
$ docker-compose up

# update variable DB_HOST on .env file with your IP in your network
# run the following command to create collections or tables in your local databse
$ source .env && npm run createDatabase
```

## Running the app

Before run the following scripts on local, remember to load your enviroment variables with the command:
```bash
$ source .env
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Postman collection to API

Here is the Postman collection used in the project:

- [pokemon-trainer.postman_collection.json](pokemon-trainer.postman_collection.json)
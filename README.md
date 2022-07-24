
## Description

A simple REST API application under Docker environment.
* NestJS
* TypeORM
* PostgreSQL
* Swagger
* Docker

# Running the app on docker
## Docker build & start

```bash
# docker env build
$ docker-compose build

# docker env start
$ docker-compose up

# remove docker container (services & networks)
$ docker-compose down
```

# Running the app without docker
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

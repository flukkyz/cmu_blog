# cmu-blog

## Setup Environment

```bash
# Copy Example ENV
$ cp .env.example .env

# update ENV & Save
$ nano .env
```

## Database Migration

```bash
# install api dependencies in API directory
$ cd ./api
$ npm install

# Copy Database Example in ENV API directory
$ cp .env.example .env

# update ENV & Save
$ nano .env

# Migrate your database in ENV API directory (require global "npx")
$ npx sequelize db:migrate
```

## Build Setup

```bash
# install api dependencies in API directory
$ cd ./api
$ npm install

# back to base directory
$ cd ..

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Docker Compose

```bash
# install api dependencies
$ docker-compose up -d --build
```

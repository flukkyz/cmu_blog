# cmu-blog
CMU Blog with CMU OAuth on Nuxt.js

## Setup Environment

```bash
# Copy Example ENV
$ cp .env.example .env

# Update ENV & Save
$ nano .env
```

## Database Migration

```bash
# Install api dependencies in API directory
$ cd ./api
$ npm install

# Copy Database Example in ENV API directory
$ cp .env.example .env

# Update ENV & Save
$ nano .env

# Migrate your database in ENV API directory 
#(require global "npx" if not, please install $ npm install -g npx )
$ npx sequelize db:migrate
```

## Build Setup

```bash
# Install api dependencies in API directory
$ cd ./api
$ npm install

# Back to base directory
$ cd ..

# Install dependencies
$ yarn install

# Serve with hot reload at localhost:3000
$ yarn dev

# Build for production and launch server
$ yarn build
$ yarn start

# Generate static project
$ yarn generate
```

## Docker Compose

```bash
# Build docker
$ docker-compose up -d --build
```

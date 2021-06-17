# cmu-blog

## Setup Environment

```bash
# install api dependencies
$ cp .env.example .env

# update ENV & Save
$ nano .env
```

## Build Setup

```bash
# install api dependencies
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

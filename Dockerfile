FROM node:12.20.1-alpine3.10

RUN mkdir -p /app
COPY . /app/

WORKDIR /app/api
RUN npm install

WORKDIR /app
RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
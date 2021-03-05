FROM node:latest

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install
RUN yarn global add typescript
RUN yarn global add ts-node
RUN yarn global add nodemon

CMD nodemon -L
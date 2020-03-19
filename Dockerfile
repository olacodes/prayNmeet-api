FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install

RUN yarn add nodemon

COPY . .

EXPOSE 3000

FROM node:11

COPY package.json yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn test
# Packages installation
FROM node:18-alpine AS packages
WORKDIR /packages

COPY ./package.json ./tsconfig.json ./tsconfig.build.json ./yarn.lock ./
RUN yarn install

# Development and build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=packages ./packages ./
COPY ./src ./src
COPY ./.env ./

RUN yarn build

CMD ["yarn", "start:dev"]

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

COPY --from=builder ./dist ./.env ./

CMD [ "node", "./dist/main.js" ]

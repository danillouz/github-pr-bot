FROM node:10.0-alpine AS build

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN [ "npm", "i" ]

COPY src ./src

RUN chown -R node:node .
USER node

FROM node:10.0-alpine

COPY --from=build /app ./

CMD [ "node", "src" ]
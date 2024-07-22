FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:18-alpine AS final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

ENV NODE_PATH=/usr/src/app/src

CMD ["npm", "start"]

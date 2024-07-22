FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_PATH=/usr/src/app/src

CMD ["npm", "test"]

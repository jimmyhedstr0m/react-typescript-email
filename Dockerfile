FROM node:10-alpine AS build

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
RUN npm run build

COPY . .

CMD ["npm", "run", "serve"]
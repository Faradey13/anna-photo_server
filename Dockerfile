FROM node:18

LABEL authors="johnn"

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]
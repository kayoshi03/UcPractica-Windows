FROM node:16

WORKDIR /app

COPY packag*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start"]
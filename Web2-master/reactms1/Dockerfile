FROM node:14-alpine

WORKDIR /app

COPY /reactms1 .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

FROM node:14-alpine

WORKDIR /app/backend

COPY . .

RUN npm install

EXPOSE 443 80

CMD ["npm", "start"]

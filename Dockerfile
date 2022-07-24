FROM node:12-alpine

EXPOSE 8000

WORKDIR /app/

RUN mkdir -p ./dist

COPY src ./src

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install --force

CMD ["npm", "run", "start:dev"]
FROM node:latest

WORKDIR /bot

COPY package.json ./
COPY pnpm*.yml ./

RUN npm i -g pnpm
RUN pnpm i -P
COPY . .

CMD ["node", "src/main.js"]
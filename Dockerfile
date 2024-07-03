FROM node:20-alpine AS build

WORKDIR /usr/src

COPY package.json prisma tsconfig.json .env ./

COPY . .

RUN npm i 

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src

COPY --from=build /usr/src/package.json ./
COPY --from=build /usr/src/build ./
COPY --from=build /usr/src/node_modules ./
COPY --from=build /usr/src/prisma ./

EXPOSE 3333

CMD [ "npm run start" ]
FROM node:20-alpine AS build

WORKDIR /usr/src

COPY package.json prisma tsconfig.json .env ./

COPY . .

RUN npm ci
RUN npm install bcrypt

RUN npm run build

FROM node:20-alpine

WORKDIR /usr/src

COPY --from=build /usr/src/package.json ./package.json
COPY --from=build /usr/src/build ./build
COPY --from=build /usr/src/node_modules ./node_modules
COPY --from=build /usr/src/prisma ./prisma

CMD [ "npm run start" ]
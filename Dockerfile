FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npx tsc

ENV TZ=Asia/Bangkok

EXPOSE 3000

CMD ["node", "./dist/app.js"]

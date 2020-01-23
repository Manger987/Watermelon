FROM alpine:latest
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install

COPY . /app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD [ "index.ts" ]
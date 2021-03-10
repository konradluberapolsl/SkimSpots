FROM node:14.15.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install --silent

CMD ["npm", "start"]
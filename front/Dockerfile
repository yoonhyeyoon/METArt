FROM node

WORKDIR /usr/app

COPY *.* /usr/app/

RUN npm install

COPY . /usr/app/

RUN npm run build

CMD [ "npm", "run", "dev"]
FROM node

WORKDIR /home/deploy/front

COPY *.* /home/deploy/front/

RUN npm install

COPY . /home/deploy/front/

RUN npm run build

CMD [ "npm", "run", "start"]
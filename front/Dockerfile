FROM node

WORKDIR /home/ubuntu/deploy/front

COPY *.* /home/ubuntu/deploy/front

RUN npm install

COPY . /home/ubuntu/deploy/front/

RUN npm run build

CMD [ "npm", "run", "dev"]
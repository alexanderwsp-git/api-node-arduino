FROM node:8
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]

#docker run -it --rm --name ard-node1.0 -p 1080:3000 -v "$PWD":/usr/src/app -w /usr/src/app ard-node:1.1

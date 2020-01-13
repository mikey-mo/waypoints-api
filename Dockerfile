FROM node:12.11.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
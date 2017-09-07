FROM node:8

# Global Container Utils
RUN apt-get update
RUN npm install -g yarn

# App Code
RUN mkdir /app
COPY . /app

# Dependencies
WORKDIR /app
RUN yarn install --pure-lockfile

# Ports
EXPOSE 8080

CMD node /app/arsenal-dock.js
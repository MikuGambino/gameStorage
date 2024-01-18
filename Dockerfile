# use node
FROM node:16
# copy the project folder
COPY ./gamestorage .
# install dependencies
RUN npm install
# an entry point for running an app
ENTRYPOINT ["node", "index.js"]

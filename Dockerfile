FROM node
MAINTAINER "alibek.karimov@gmail.com"

RUN npm install -g bower

# Install app dependencies
#COPY package.json /src/package.json
# Bundle app source
COPY . /src
RUN cd /src; npm install --production; npm run postinstall
RUN cd /src; bower install --allow-root

WORKDIR "/src"

RUN chmod +x startup.sh

# Expose the default port
EXPOSE 8000
EXPOSE 8001

CMD ["npm", "start"]

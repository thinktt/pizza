FROM node:18-alpine

ADD docs/ /opt/pizza
WORKDIR /opt/pizza
RUN npm install http-server

CMD ["npx", "http-server"]

# docker run --rm -p 8080:8080 pizza --name pizza
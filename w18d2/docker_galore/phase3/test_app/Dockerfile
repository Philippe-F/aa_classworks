FROM node:10.13.0-alpine
WORKDIR /app
COPY . /app
EXPOSE 3000
RUN cd /app && npm install
CMD ["npm", "start"] 
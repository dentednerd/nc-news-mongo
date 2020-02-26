FROM node:10.15.0-alpine
LABEL maintainer="Joanne Imlay"
ARG NPM_TOKEN
WORKDIR /app
COPY . .
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
RUN ["npm", "install"]
RUN rm -f .npmrc
RUN npm install -g nodemon
EXPOSE 3000
EXPOSE 3090
CMD ["npm", "start"]

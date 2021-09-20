FROM node:16-slim

COPY ./ /
RUN npm ci

ENTRYPOINT ["npm", "start"]

FROM node:10-alpine AS build

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

ENV REACT_DEV_BUNDLE_PATH=/static/js/vendor.js
ENV GENERATE_SOURCEMAP=false

RUN npm install
COPY --chown=node:node . .

RUN npm run build --production
RUN npm prune --production

# Copy node_modules and build folder to instance. Run the server
FROM node:10-alpine

WORKDIR /home/node/app

ENV NODE_ENV="production"

USER node

COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/build ./build

ENTRYPOINT [ "node", "build/server.js" ]
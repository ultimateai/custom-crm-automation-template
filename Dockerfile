FROM node:18-alpine AS preparation
USER root
COPY package.json package-lock.json ./
# We need to temporarily override the version, to allow caching
# https://stackoverflow.com/questions/51110793/bumping-package-json-version-without-invalidating-docker-cache
RUN ["node", "-e", "\
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));\
  const pkgLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf-8'));\
  pkgLock.packages[''].version = '0.0.0';\
  fs.writeFileSync('package.json', JSON.stringify({ ...pkg, version: '0.0.0' }));\
  fs.writeFileSync('package-lock.json', JSON.stringify({ ...pkgLock, version: '0.0.0' }));\
  "]

FROM node:18-alpine AS production_modules
# env variable to satisfy prepare.js and skip husky install
ENV CI=true
COPY --from=preparation package.json package-lock.json ./
COPY prepare.js .npmrc ./
RUN npm i --only=prod --loglevel verbose

FROM node:18-alpine AS build
ENV CI=true
COPY --from=preparation package.json package-lock.json ./
COPY prepare.js .npmrc ./
COPY --from=production_modules  /node_modules node_modules
COPY . .
RUN npm run build

FROM node:18-alpine
USER node
WORKDIR /home/node
COPY --chown=node --from=production_modules  /node_modules node_modules
COPY --chown=node --from=build  dist dist
COPY --chown=node --from=build  package.json package-lock.json swagger.yaml ./
CMD ["npm", "start"]

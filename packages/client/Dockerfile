FROM node:14.17.4-alpine as build-stage

WORKDIR /app

RUN addgroup -S devops && adduser -h /devops -S devops -G devops -u 1200 \
		&& mkdir /out \
		&& mkdir /devops/.cache \
		&& chown -R devops:devops /out \
		&& chown -R devops:devops /devops

# install and cache app dependencies
COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY --chown=devops:devops ./ /app/

# test and lint here when added

RUN yarn build

FROM nginx:1.19.0

COPY --from=build-stage /app/build/ /usr/share/nginx/html

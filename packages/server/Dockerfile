FROM node:14.17.4-alpine as base

WORKDIR /app

RUN addgroup -S devops && adduser -h /devops -S devops -G devops -u 1200 \
		&& mkdir /out \
		&& mkdir /devops/.cache \
		&& chown -R devops:devops /out \
		&& chown -R devops:devops /devops

# install and cache app dependencies
COPY ["package.json", "yarn.lock", "./"]
COPY package.json /app/

RUN yarn install --frozen-lockfile

COPY --chown=devops:devops . .

# test and lint here when added

USER devops
EXPOSE 5000
CMD [ "yarn", "start" ]

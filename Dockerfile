FROM node:18-slim

ARG UID=1000
ARG GID=1000

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN groupadd -o -g ${GID} nodejs || true && \
    useradd  -o -u ${UID} -g nodejs -m -s /bin/bash nodejs || true

COPY . .

COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 3000

CMD ["npm", "run", "dev"]
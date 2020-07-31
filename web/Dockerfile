FROM node:12 AS builder

ARG API_HOST=localhost:3000
ARG API_PROTOCOL=http

WORKDIR /app

COPY package*json ./
RUN npm ci

COPY . .
RUN echo "export const API_URL = '${API_PROTOCOL}://${API_HOST}';" > /app/src/api_url.js
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/public /usr/share/nginx/html
# Build Stage
FROM node:21-alpine3.18 AS BUILD_IMAGE
WORKDIR /app
COPY app/frontend/package*.json ./
RUN npm config set proxy http://172.16.0.53:3128 
RUN npm ci
COPY app/frontend .
RUN npm run build


# Production Stage
FROM node:21-alpine3.18 AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5050
CMD ["npm", "start"]
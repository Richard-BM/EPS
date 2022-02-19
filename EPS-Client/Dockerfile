FROM node:16 AS builder
WORKDIR /dist/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install yarn
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /dist/src/app/dist /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80

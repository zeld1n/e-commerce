FROM node:18-alpine as build
WORKDIR /app
COPY ./front-end/package.json ./front-end/package-lock.json ./
RUN npm install
COPY ./front-end ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

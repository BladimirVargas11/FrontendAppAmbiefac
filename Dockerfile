
FROM node:20-alpine as build-step

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install --force

COPY . /app
RUN npm run build --prod

# Establecer la imagen base para la etapa de producción
FROM nginx:1.17.1-alpine

# Copiar los archivos de compilación de la aplicación Angular en el servidor Nginx
COPY --from=build-step /app/dist/ambiefac-front /usr/share/nginx/html/


COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para que Nginx pueda servir la aplicación
EXPOSE 80





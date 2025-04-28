# Verwende ein Node.js-Image, um die Anwendung zu bauen
FROM node:23-alpine AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Projekts
COPY . .

# Baue die Angular-Anwendung
RUN npm run build --prod

# Verwende ein Nginx-Image, um die Anwendung bereitzustellen
FROM nginx:alpine

# Kopiere die gebauten Dateien in den Nginx-Ordner
COPY --from=build /app/dist/htb-vcard /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
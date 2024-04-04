FROM node:18 as build
WORKDIR /baddie

COPY package*.json .
RUN npm install -f
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /baddie/build /usr/share/nginx/html
FROM node:13.12.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm ci --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . ./

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
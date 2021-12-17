# stage1 - build react app first
#FROM node:12.16.1-alpine3.9 as build
FROM node:14.18.2-alpine3.13 as build
#RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
#COPY ./yarn.lock /app/
#RUN yarn
RUN npm install
COPY . /app
#RUN yarn build
RUN npm build

# stage 2 - build the final image and copy the react build files
#FROM nginx:1.17.8-alpine
FROM nginx:1.21.4-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
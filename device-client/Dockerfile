FROM node:14 as build-step

# Create app directory
RUN mkdir /app

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# add app
COPY . /app

# start app
CMD ["npm", "start"]

# RUN npm run build

# # production environment
# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
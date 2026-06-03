# Use to image for node js
FROM node:20-alpine

# Install python and pip
RUN apk add --no-cache python3 py3-pip

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies using yarn
RUN yarn install

# Copy app source code
COPY . .

# Copy the .env.docker file to .env
COPY .env.docker .env

# Build the app
RUN yarn build

# Expose port and start application
EXPOSE 5000

CMD ["yarn", "start"]

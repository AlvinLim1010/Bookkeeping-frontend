# Use the official Node.js LTS image as a base image
FROM node:16-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the environment file
COPY .env .env

# Expose the port on which the app will run
EXPOSE 8080

# Build the Vue.js application
RUN npm run build

# Command to start the application
CMD [ "npm", "start" ]

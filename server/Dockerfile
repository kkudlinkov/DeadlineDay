# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

RUN npm rebuild bcrypt --build-from-source

# Bundle app source inside the Docker image
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "start"]
# Use a base Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the application for production
RUN npm run build

# Expose the port on which the application will listen
EXPOSE 3000

# Command to serve the application
CMD ["npm", "start"]

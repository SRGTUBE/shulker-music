# Use official Node.js image as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using legacy peer dependencies and force flag
RUN npm install --legacy-peer-deps --force

# Copy the rest of your project files to the container
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

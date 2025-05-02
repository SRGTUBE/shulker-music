# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (legacy peer dependencies if needed)
RUN npm install --legacy-peer-deps

# Copy the rest of your application files
COPY . .

# Expose the port that your app will use (adjust port if needed)
EXPOSE 3000

# Define the command to run your app
CMD ["node", "index.js"]

# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps

# Copy all the other application files
COPY . .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

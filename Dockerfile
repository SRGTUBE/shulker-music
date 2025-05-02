# Use Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Fix install error using legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Start the bot
CMD ["npm", "start"]

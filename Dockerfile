# Use official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, bypassing peer dependency issues
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port that your app listens on (if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

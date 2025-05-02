# Use a more recent Node.js version (e.g., 18 or 20)
FROM node:18

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

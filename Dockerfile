FROM node:20

WORKDIR /app

COPY package*.json ./

# Force legacy peer deps install
RUN npm install --legacy-peer-deps

COPY . .

CMD ["npm", "start"]

FROM node

# Install Puppeteer dependencies
RUN apt update && apt install -y wget --no-install-recommends \
    && apt install -y libx11-xcb1 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 \
    libgtk-3-0 libnss3 libxss1 \
    && apt clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3120
CMD [ "node", "server.js" ]

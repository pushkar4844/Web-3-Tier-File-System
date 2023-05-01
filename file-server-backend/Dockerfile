FROM --platform=linux/amd64 node:16.18.0-alpine3.15


WORKDIR '/app'

# Copy package.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

EXPOSE 3000

# Run the app
CMD ["npm", "start"]


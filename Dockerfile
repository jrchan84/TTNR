FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# ALTERNATIVE: inject secrets to docker env variables (Not Working)
# Env variables set in deploy-to-gce.yaml via google-github-actions/get-secretmanager-secrets@v0
# ARG ARG_ENV_CLIENT_ID
# ARG ARG_ENV_DISCORD_TOKEN
# ARG ARG_ENV_GUILD_ID
#
# Creates local .env file from docker env variables
# COPY inject-secrets.sh ./
# RUN chmod +x ./inject-secrets.sh

# Bundle app source
COPY . .

# Run the bot
CMD ["npm", "start"]
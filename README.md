# TTNR
TTNR is a custom discord bot for the DSC UBC General Server. It's main purpose is to increase DSC's community engagement in discord through general purpose use, gamified user interaction, and networking encouragement.

TTNR is implemented with Node.js and JavaScript, utilizing the popular Discord.js library. The bot will be hosted on Google Compute Engine utilizing the free tier.

## Development

### Library/Package Versions

- Node.js: 16.1.11
- NPM version: 8.1.0 (optional)

### Utils
deploy-commands.js
- Used to register /commands with Discord. Run this file with `node deploy-commands.js` after adding commands.

startup-script.sh
- GCE VM startup-script included here for reference.

###  Running the project

- Clone the repo
- run `npm install`
- Create a .env file in the root directory with the following fields: `DISCORD_TOKEN=<TOKEN> CLIENT_ID=<CLIENTID> GUILD_ID=<SERVERID>`
  - TOKEN: Reach out to Project Owner for token. Keep your token a secret!
  - CLIENTID: 899400703112519690
  - SERVERID: Server where bot is added. To find your guildID, enable developer mode in Discord and left click the servers name -> copy ID.
- run `node bot.js` or `npm start`
- run npm `test` to run the jest test suite

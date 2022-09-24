### Implementation

**Versions and Packages**

NPM version: ^8.x
Node.js version: ^16.x
Packages:
    Discord.js: v13
        @discordjs/builders
        @discordjs/rest
        discord-api-types
    nodejs-firestore: 
    dotenv: ^10.0.0
    eslint: ^8.0.1

**Tech Stack**

- Node.js JavaScript application
    - npm - package manager
    - Discord.js - Library used to interface with Discord API
    - Google Cloud Firestore - NoSQL managed database
    - nodejs-firestore - Firestore client
    - dotenv - environmental variables injection for tokens, secrets, credentials
    - eslint - linter for code quality
    

**Process Flow**

bot.js is the main entry point into the application. This file initializes the bot, setting Gateway Intents (what events to receive from Discord), logs in to discord with the token, and handles commands and events.

bot.js reroutes command/event requests to the following folders:

- /commands : Incoming commands are read in here and makes appropriate responses.
- /events : Incoming events are read in here and handled appropriately
    - /services : requests that require a read/write from database call functions in here.

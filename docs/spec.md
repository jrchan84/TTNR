# Project Specification

TTNR is a custom discord bot for the DSC UBC General Server. It's main purpose is to increase DSC's community engagement in discord through general purpose use, gamified user interaction, and casual networking encouragement.
TTNR is implemented with Node.js and JavaScript, utilizing the popular Discord.js library, and Firestore. The bot will be hosted on Google Cloud platform.

## Functionality

- **General Use (command-driven)**
    - /info : The bot responds with a description of itself, and it's available commands (dynamically)
    - /socials: The bot responds with DSC UBC's social media links
    - /level: The bot responds with the user's current server role and their XP and XP Threshold via a visual approximation
        - The bot gives hints to how to level up, but does not expose XP thresholds and calculations
    - /events: TBD once website backend functionality is set up → pull upcoming events from API endpoint

- **Gamified User Interaction (event-driven)**
    - The bot keeps track of user activity and experience points, "leveling-up" users once they attain enough XP.
        - XP is calculated by message count and voice chat durations, with anti-spam and anti-abuse measures.
            - Chat message : 1 XP
            - Reactions : 1 XP
            - 1 Min Voice Chat: 10 XP (unmuted and un-deafened)
        - Levels are reflected via server roles, mirroring custom titles like Google's career levels
        - When a user levels up, the bot congratulates the user with a promotion message.
        - | **Server Role**    | XP Threshold        |
          |--------------------|---------------------|
          | DSC UBC Fellow     | 1,000,000+          |
          | Distinguished      | 500,001 - 1,000,000 |
          | Principal          | 100,000 - 500,000   |
          | Senior Staff Level | 10,001 - 100,000    |
          | Staff Level        | 1001 - 10,000       |
          | Senior             | 101 - 1000          |
          | Junior             | 0 - 100             |
        
- **Networking (command-driven and event-driven)**
    - The bot introduces members in the channel on a weekly basis based on user interests
        - Users indicate their interest in participation and ranks their top 5 interests from a provided list
            - /meet: respond with a message form that collects preferences and intention to participate.
        - The bot matches users in the matching pool with a modified Gale-Shapely Algorithm based on their interests
        - The bot creates a private group message with a matched pair of users, and makes introductions based on their interests.
        
## Requirements
- The bot must be running exactly one instance at all times (excluding testing locally) and be able to respond to discord commands and events.
- The bot must only receive relevant commands and events, defined in the Gateway and Discord.Intents.
- The bot must reply to all slash commands correctly.
    - If an error is thrown, it must reply to the command with an error message.
- The bot keeps track of each member's XP, and promotes user roles accordingly.
    - User Levels and XP must persist upon restarts or instance shutdowns with minimal to no data loss.
    - Backups of database must be made on a weekly basis

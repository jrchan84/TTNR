**This documentation is deprecated, and will be replaced with the new dockerized infrastructure**

### Development - Version Control, Testing, Deployment, Secrets

**How do I develop the bot?**

Prereqs: Install Node v16.x, NPM v8.x

- clone the repository to your local computer. [https://github.com/ubcdsc/TTNR](https://github.com/ubcdsc/TTNR)
- cd into the project directory from your terminal/command line.
- Create or checkout a branch from main with the functionality you are working on
- run npm install
- Create a file named ".env" in the project directory. Define the following variables (reach out to product owner):
    
    `DISCORD_TOKEN=xxx 
     CLIENT_ID=xxx 
     GUILD_ID=xxx`
    
- Code!
- run npm start or node bot.js to run the bot
- After testing the code locally, commit and push your changes to the branch
- If the functionality is done, create a pull request (set at least 1 reviewer from the team) from GitHub to merge the branch to main.

**How do I deploy these changes to the VM Instance?**

- After merging the changes to main, the source repository will automatically mirror the changes
- All you have to do is restart the VM
    - Navigate to the GCP Console with the gdscubc@gmail.com account
    - Navigate to Compute Engine > Virtual Machine Instances
    - Select ubcdsc-vm-1 and restart
        - Restart may take up to 10 minutes

**Local Testing**

The following discord channel has been created to facilitate testing. Join the channel to test the bot [https://discord.gg/s33AvxayRc](https://discord.gg/s33AvxayRc)
The bot is currently configured to this server.
You can run the bot locally in your terminal by running `node bot.js` from the project directory.

Note that you may see errors as Discord has undefined behavior when two instances of the same bot is running, and our VM will always have an instance of the bot running. It is preferred to test functionality via the VM Instance, but do test changes locally before merging changes into main for runtime errors.

**Secrets**

Locally, you can create new secrets by adding a variable to the .env file and accessing the variable via `process.env.VARIABLE_NAME` in code. Make sure to never push this .env file to GitHub by ignoring it in .gitignore!

Creating these secrets in the VM Instance is a bit different. We are using Google Secret Manager to store these secrets safely in the cloud.
If you are unfamiliar with the next steps, reach out to the product owner.

- Create the new secret in Google Secret Manager (In GCP) - Ensure the default compute service account has access to it
- Modify the startup-script to inject it as an environmental variable. Never hard code values in the start-up script! 
The following section of the script handles injecting secrets into the .env file on the virtual machine.
    
    ```jsx
    # Inject env variables from Secret Manager
    
    token=$(gcloud secrets versions access 1 --secret="DISCORD_TOKEN") //uses the google cloud SDK to make a request to secret manager
    client=$(gcloud secrets versions access 1 --secret="CLIENT_ID")
    guild=$(gcloud secrets versions access 1 --secret="GUILD_ID")
    
    cat >./.env << EOF        // Creates a .env file in the project directory with the secrets
    DISCORD_TOKEN=$token
    CLIENT_ID=$client
    GUILD_ID=$guild
    EOF
    ```
    
- Edit the VM Instance to use the new start-up script.
- Restart the VM

Production

For this project currently, deploying to production would mean:

- Adding the bot to the UBC DSC server
- Changing the GUILD_ID to the new servers ID

Since we only have one VM instance to run off of. In practice, we would generally have another server for production.
Unfortunately we don't have the resources to mirror this structure.

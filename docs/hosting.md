**This documentation is deprecated, and will be replaced with the new dockerized infrastructure**

### Hosting - Google Compute Engine Virtual Machine

Google Compute Engine is a Google Service that allows you to create and and have full SSH access to Linux (or Ubuntn/Windows) Virtual Machines.
In other words, we can provision one of Google's computers for our own use.

To manage and see system logs, log in to the gdscubc@gmail.com Google Cloud Platform console: [https://console.cloud.google.com/home/dashboard?authuser=3&project=ttrn-discord-bot](https://console.cloud.google.com/home/dashboard?authuser=3&project=ttrn-discord-bot)

- You can see the Virtual Machine and view logs under Compute Engine > Virtual Machine Instances

The VM we have created to host our bot: 

ubcdsc-vm-1

- Machine Type: f1-micro (1 vCPU, 0.6 GB memory)
- Zone: us-west1-b
- Firewalls: allow HTTP/HTTPS traffic
- Operating System: Debian 10 (Linux)
- Service Account: (default)
- Startup-Script: script that is run whenever the instance is restarted. This will pull new changes from the Source Repository.
    - Installs logging monitor (google fluentd)
    - Installs Node.js 16x
    - Installs git
    - Installs ca-certificates, build-essential, supervisor (user that runs our bot on the machine)
    - clones the google source repository (which mirrors our github repository)
    - runs npm install in the repository
    - Injects a .env file with the discord token, client id, and guild id.
        - Fetches secrets securely through Google Secrets Manager
    - configures supervisor to start the bot

Google's free tier allows one VM instance at any time, and it must be a f1-micro CPU and provisioned in us-west-1 (Oregon).

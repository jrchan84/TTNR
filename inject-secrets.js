// TODO: hardcoded project-id workaround
const CLIENT_ID = 'projects/802374845507/secrets/CLIENT_ID/versions/latest';
const DISCORD_TOKEN = 'projects/802374845507/secrets/DISCORD_TOKEN/versions/latest';
const GUILD_ID = 'projects/802374845507/secrets/GUILD_ID/versions/latest';

// Imports the Secret Manager library
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const fs = require('fs')
// Instantiates a client
const client = new SecretManagerServiceClient();

// SecretManager only supports fetching 1 secret per API call
async function accessSecret1Version() {
  const [version] = await client.accessSecretVersion({
      CLIENT_ID: CLIENT_ID,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  writeToEnv(payload);
}

async function accessSecret2Version() {
  const [version] = await client.accessSecretVersion({
      DISCORD_TOKEN: DISCORD_TOKEN,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  writeToEnv(payload);
}

async function accessSecret3Version() {
  const [version] = await client.accessSecretVersion({
      GUILD_ID: GUILD_ID,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  writeToEnv(payload);
}

async function writeToEnv(payload) {
    console.log(payload);
    try {
        if (fs.existsSync("./.env")) {
            await fs.appendFile('./.env', payload)
        } else {
            await fs.writeFile('./.env', payload)
        }
    } catch (err) {
    console.error(err)
    }

    fs.readFile('./.env', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });
}

accessSecret1Version();
accessSecret2Version();
accessSecret3Version();
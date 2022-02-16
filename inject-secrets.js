// TODO: hardcoded project-id workaround
const CLIENT_ID = 'projects/802374845507/secrets/CLIENT_ID/versions/latest';
const DISCORD_TOKEN = 'projects/802374845507/secrets/DISCORD_TOKEN/versions/latest';
const GUILD_ID = 'projects/802374845507/secrets/GUILD_ID/versions/latest';

// Imports the Secret Manager library
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const fs = require('fs')
// Instantiates a client
const client = new SecretManagerServiceClient();

async function accessSecretVersion() {
  const [version] = await client.accessSecretVersion({
      CLIENT_ID: CLIENT_ID,
      DISCORD_TOKEN: DISCORD_TOKEN,
      GUILD_ID: GUILD_ID,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  // WARNING: Do not print the secret in a production environment - this
  // snippet is showing how to access the secret material.
  writeToEnv(payload);
}

function writeToEnv(payload) {
    console.log(payload);
    try {
    fs.writeFileSync('./.env', payload)
    } catch (err) {
    console.error(err)
    }
}

accessSecretVersion();
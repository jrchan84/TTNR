// TODO: hardcoded project-id workaround
const CLIENT_ID = 'projects/802374845507/secrets/CLIENT_ID/versions/latest';
const DISCORD_TOKEN = 'projects/802374845507/secrets/DISCORD_TOKEN/versions/latest';
const GUILD_ID = 'projects/802374845507/secrets/GUILD_ID/versions/latest';
const path = '.env'

// Imports the Secret Manager library
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const fs = require('fs')

// Instantiates a client
const client = new SecretManagerServiceClient();

// SecretManager only supports fetching 1 secret per API call
async function accessSecret1Version() {
  const [version] = await client.accessSecretVersion({
      name: CLIENT_ID,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();
  const envPayload = 'CLIENT_ID=' + payload + '\r\n';

  writeToEnv(envPayload);
}

async function accessSecret2Version() {
  const [version] = await client.accessSecretVersion({
      name: DISCORD_TOKEN,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();
  const envPayload = 'DISCORD_TOKEN=' + payload + '\r\n';

  writeToEnv(envPayload);
}

async function accessSecret3Version() {
  const [version] = await client.accessSecretVersion({
      name: GUILD_ID,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();
  const envPayload = 'GUILD_ID=' + payload + '\r\n';

  writeToEnv(envPayload);
}

async function writeToEnv(payload) {
    try {
        if (fs.existsSync(path)) {
            await fs.appendFile(path, payload, function(err, result) {
                if(err) console.log('error', err);
            });
        } else {
            await fs.writeFile(path, payload, function(err, result) {
                if(err) console.log('error', err);
            });
        }
    } catch (err) {
    console.error(err)
    }

    fs.readFile(path, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data + '\n');
    });
}

accessSecret1Version();
accessSecret2Version();
accessSecret3Version();
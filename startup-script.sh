set -v

# [START startup]
# Talk to the metadata server to get the project id
PROJECTID=$(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
REPOSITORY="github_ubcdsc_ttnr"

# Install logging monitor. The monitor will automatically pick up logs sent to
# syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &

# Install node.js v16
curl -sL https://deb.nodesource.com/setup_16.x | sudo bash -
apt-get install nodejs
# Install dependencies from apt
apt-get install -yq ca-certificates git build-essential supervisor


# git requires $HOME and it's not set during the startup script.
export HOME=/root
# Get the application source code from the Google Cloud Repository.
# will fail if repository already exists. This is fine since we pull after
git config --global credential.helper gcloud.sh
git clone https://source.developers.google.com/p/${PROJECTID}/r/${REPOSITORY}  /opt/app/github_ubcdsc_ttnr

# Install app dependencies
cd /opt/app/github_ubcdsc_ttnr
git checkout -b main
git pull origin main
npm install

# Inject env variables from Secret Manager
token=$(gcloud secrets versions access 1 --secret="DISCORD_TOKEN")
client=$(gcloud secrets versions access 1 --secret="CLIENT_ID")
guild=$(gcloud secrets versions access 1 --secret="GUILD_ID")

cat >./.env << EOF
DISCORD_TOKEN=$token
CLIENT_ID=$client
GUILD_ID=$guild
EOF

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/app

# Configure supervisor to run the node app.
cat >/etc/supervisor/conf.d/node-app.conf << EOF
[program:nodeapp]
directory=/opt/app/github_ubcdsc_ttnr
command=npm start
autostart=true
autorestart=true
user=nodeapp
environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update

# Application should now be running under supervisor
# [END startup]

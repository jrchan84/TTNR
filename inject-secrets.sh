# Inject env variables from Secret Manager
token=$(gcloud secrets versions access 1 --secret="DISCORD_TOKEN")
client=$(gcloud secrets versions access 1 --secret="CLIENT_ID")
guild=$(gcloud secrets versions access 1 --secret="GUILD_ID")

cat >./.env << EOF
DISCORD_TOKEN=$token
CLIENT_ID=$client
GUILD_ID=$guild
EOF
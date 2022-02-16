#!/bin/sh

touch .env
{
  printf "CLIENT_ID=%sDISCORD_TOKEN=%sGUILD_ID=%s" "$ARG_ENV_CLIENT_ID" "$ARG_ENV_DISCORD_TOKEN" "$ARG_ENV_GUILD_ID"
} >> .env
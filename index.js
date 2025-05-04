import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import { secret } from 'railway-secrets';  // Access Railway secrets

// Accessing secrets from Railway
const token = secret('DISCORD_TOKEN');
const prefix = secret('PREFIX');
const spotifyClientId = secret('SPOTIFY_CLIENT_ID');
const spotifyClientSecret = secret('SPOTIFY_CLIENT_SECRET');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    // Add any other intents as needed
  ],
});

// Create a new DisTube instance
const distube = new DisTube(client, {
  searchSongs: true,
  emitNewSongOnly: true,
  spotify: {
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret,
  },
});

// When the bot is ready
client.once('ready', () => {
  console.log(`${client.user.tag} is now online!`);
});

// Log in to Discord with the token
client.login(token);

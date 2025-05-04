import { Client, GatewayIntentBits } from 'discord.js';
import DisTube from 'distube';
import { config } from 'dotenv';
import { RailwaySecrets } from 'railway-secrets'; // Assuming you can use a secrets management package like this

// Initialize client and fetch your bot token from Railway secrets
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Fetch the token directly from Railway secrets
const token = RailwaySecrets.get('DISCORD_BOT_TOKEN'); // Replace with your secret's key

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

const distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
  leaveOnFinish: true,
  youtubeDL: true,
  highWaterMark: 1024 * 1024 * 10,
});

client.on('messageCreate', async (message) => {
  if (message.content === '!play') {
    distube.play(message, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }
});

client.login(token);

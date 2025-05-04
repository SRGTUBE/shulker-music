import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube'; // Correctly import DisTube

// Initialize client and fetch your bot token from Railway secrets
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ],
});

// Access the token directly from environment variables (Railway automatically loads secrets as env vars)
const token = process.env.DISCORD_BOT_TOKEN;  // Your secret key should be 'DISCORD_BOT_TOKEN' in Railway secrets

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

// Initialize DisTube correctly
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

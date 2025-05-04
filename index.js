import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube';
import dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Create a new instance of DisTube with the client
const distube = new DisTube(client, {
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  searchSongs: true,
  emitNewSongOnly: true,
});

// Log the bot in using the token from your .env
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Command to play a song
  if (message.content.startsWith('!play')) {
    const args = message.content.slice(6).trim(); // Extract the song name or URL
    distube.play(message.member.voice.channel, args, {
      textChannel: message.channel,
      member: message.member,
    });
  }

  // Command to skip a song
  if (message.content === '!skip') {
    distube.skip(message);
  }

  // Command to stop playing music
  if (message.content === '!stop') {
    distube.stop(message);
  }

  // Command to queue a song
  if (message.content === '!queue') {
    const queue = distube.getQueue(message);
    if (!queue) return message.channel.send('No songs in the queue!');
    message.channel.send(`Current Queue: \n${queue.songs.map((song, i) => `${i + 1}. ${song.name}`).join('\n')}`);
  }
});

import { Client, GatewayIntentBits } from 'discord.js';
import { DisTube } from 'distube'; // Adjusted import for DisTube
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Initialize DisTube using correct syntax
const distube = new DisTube({
  client,
  plugins: [
    new SpotifyPlugin(),  // Spotify plugin
    new YtDlpPlugin()     // yt-dlp plugin
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.slice().trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === '!play') {
    if (args.length === 0) return message.reply('Please provide a song URL or search term!');
    
    distube.play(message.member.voice.channel, args.join(' '), {
      member: message.member,
      textChannel: message.channel,
      message
    });
  }

  if (command === '!stop') {
    distube.stop(message.guild.id);
    message.reply('Stopped the music!');
  }

  if (command === '!skip') {
    distube.skip(message.guild.id);
    message.reply('Skipped the current song!');
  }

  if (command === '!pause') {
    distube.pause(message.guild.id);
    message.reply('Paused the music!');
  }

  if (command === '!resume') {
    distube.resume(message.guild.id);
    message.reply('Resumed the music!');
  }
});

client.login(process.env.TOKEN);

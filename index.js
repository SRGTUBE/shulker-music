import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { config } from 'dotenv'; // For loading secrets (make sure to use the secrets in the platform you're deploying on)
import fs from 'fs';
import path from 'path';

// Load secrets from environment variables (use secrets instead of .env file)
config();  // Use this if you have a .env file in your local development environment or set up correctly with secrets

const prefix = process.env.PREFIX || '.';
const token = process.env.TOKEN; // Use your bot token from secrets
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Load commands dynamically
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  import(`./commands/${file}`).then(command => {
    client.commands.set(command.name, command);
  }).catch(err => console.error(err));
}

// Set up DisTube
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

// Command handling
client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.reply('❌ An error occurred while executing the command.');
  }
});

// When the bot is ready
client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Login to Discord with the bot token
client.login(token);

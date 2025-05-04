import { Client, GatewayIntentBits, IntentsBitField } from 'discord.js';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';

const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

const distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  leaveOnFinish: false,
  leaveOnStop: true,
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot) return;

  const prefix = '!';

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel!');
    if (!args[0]) return message.reply('❌ Please provide a song name or URL!');
    distube.play(voiceChannel, args.join(' '), {
      textChannel: message.channel,
      member: message.member
    });
  }

  if (command === 'stop') {
    distube.stop(message);
    message.channel.send('⏹️ Music stopped.');
  }

  if (command === 'skip') {
    distube.skip(message);
    message.channel.send('⏭️ Skipped the song.');
  }
});

distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(`🎶 Playing \`${song.name}\` - \`${song.formattedDuration}\``)
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(`➕ Added \`${song.name}\` - \`${song.formattedDuration}\``)
  )
  .on('error', (channel, error) => {
    console.error(error);
    channel.send('❌ An error occurred: ' + error.message);
  });

client.login(TOKEN);

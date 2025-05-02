export const name = 'nowplaying';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song is currently playing.');
  const song = queue.songs[0];
  message.channel.send(`🎶 Now Playing: **${song.name}** - \`${song.formattedDuration}\``);
}

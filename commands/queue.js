export const name = 'queue';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ Queue is empty.');
  const q = queue.songs
    .map((song, i) => `${i === 0 ? '🎶' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
    .join('\n');
  message.channel.send(`📜 **Current Queue:**\n${q}`);
}

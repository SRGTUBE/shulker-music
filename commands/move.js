export const name = 'move';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ Queue is empty.');
  const [from, to] = args.map(Number);
  if (
    isNaN(from) || isNaN(to) ||
    from < 1 || from >= queue.songs.length ||
    to < 1 || to >= queue.songs.length
  ) return message.reply('❗ Invalid song positions.');
  const song = queue.songs.splice(from, 1)[0];
  queue.songs.splice(to, 0, song);
  message.reply(`➡️ Moved **${song.name}** to position ${to}.`);
}

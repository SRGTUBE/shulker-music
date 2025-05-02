export const name = 'remove';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ Nothing to remove.');
  const index = parseInt(args[0]);
  if (isNaN(index) || index <= 0 || index >= queue.songs.length) return message.reply('❗ Invalid song number.');
  const removed = queue.songs.splice(index, 1)[0];
  message.reply(`🗑️ Removed **${removed.name}** from the queue.`);
}

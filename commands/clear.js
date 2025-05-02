export const name = 'clear';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ Nothing to clear.');
  queue.songs = [queue.songs[0]]; // keep now playing
  message.reply('🧹 Cleared the queue (except current song).');
}

export const name = 'nightcore';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song playing.');
  queue.setFilter('nightcore');
  message.reply('🎧 Nightcore mode enabled!');
}

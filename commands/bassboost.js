export const name = 'bassboost';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song playing.');
  queue.setFilter('bassboost');
  message.reply('💥 Bassboost enabled!');
}

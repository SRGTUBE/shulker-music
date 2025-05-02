export const name = 'stop';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song is playing.');
  queue.stop();
  message.reply('🛑 Stopped the music and cleared the queue.');
}

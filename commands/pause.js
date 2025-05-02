export const name = 'pause';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song is currently playing.');
  queue.pause();
  message.reply('⏸️ Paused the music.');
}

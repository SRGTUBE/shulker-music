export const name = 'skip';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song to skip.');
  queue.skip();
  message.reply('⏭️ Skipped to the next song.');
}

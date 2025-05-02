export const name = 'resume';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No song is currently paused.');
  queue.resume();
  message.reply('▶️ Resumed the music.');
}

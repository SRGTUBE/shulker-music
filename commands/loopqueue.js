export const name = 'loopqueue';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No music to loop.');
  queue.setRepeatMode(2);
  message.reply('🔂 Looping the whole queue.');
}

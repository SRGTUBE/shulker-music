export const name = 'loop';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ No music to loop.');
  queue.setRepeatMode(1);
  message.reply('🔁 Looping current song.');
}

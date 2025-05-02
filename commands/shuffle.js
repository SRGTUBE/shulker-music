export const name = 'shuffle';
export function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  if (!queue) return message.reply('❌ Nothing to shuffle.');
  queue.shuffle();
  message.reply('🔀 Queue shuffled!');
}

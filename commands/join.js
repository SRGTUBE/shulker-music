export const name = 'join';
export function execute(message) {
  const channel = message.member.voice.channel;
  if (!channel) return message.reply('❗ You must be in a voice channel.');
  channel.join();
  message.reply('✅ Joined the voice channel.');
}

export const name = 'leave';
export function execute(message, args, client) {
  const channel = message.guild.members.me.voice.channel;
  if (!channel) return message.reply('❌ I am not in a voice channel.');
  client.distube.voices.leave(message);
  message.reply('👋 Left the voice channel.');
}

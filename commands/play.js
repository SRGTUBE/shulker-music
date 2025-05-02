export const name = 'play';
export async function execute(message, args, client) {
  if (!message.member.voice.channel)
    return message.reply('🎧 You must be in a voice channel!');
  if (!args.length)
    return message.reply('❗ Provide a song name or link!');
  client.distube.play(message.member.voice.channel, args.join(' '), {
    textChannel: message.channel,
    member: message.member,
  });
}

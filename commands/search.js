export const name = 'search';
export async function execute(message, args, client) {
  if (!args.length) return message.reply('❗ Provide a search term.');
  const result = await client.distube.search(args.join(''));
  if (!result.length) return message.reply('❌ No results found.');

  const list = result.slice(0, 5).map((song, i) => `${i + 1}. ${song.name} - ${song.formattedDuration}`).join('\n');
  message.channel.send(`🔍 **Search Results:**\n${list}\n\nType \`.play <name>\` to play one.`);
}

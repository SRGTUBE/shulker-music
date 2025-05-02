import fetch from 'node-fetch';

export const name = 'lyrics';
export async function execute(message, args, client) {
  const queue = client.distube.getQueue(message);
  const song = queue?.songs[0];
  if (!song) return message.reply('❌ No song playing.');

  const query = encodeURIComponent(song.name);
  try {
    const res = await fetch(`https://some-random-api.ml/lyrics?title=${query}`);
    const data = await res.json();
    if (data.error) return message.reply('❌ Lyrics not found.');
    const lyrics = data.lyrics.substring(0, 1990);
    message.channel.send(`🎤 **Lyrics for ${data.title}:**\n\n${lyrics}`);
  } catch {
    message.reply('❌ Failed to fetch lyrics.');
  }
}

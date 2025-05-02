export const name = 'volume';
export function execute(message, args, client) {
  const volume = parseInt(args[0]);
  if (isNaN(volume) || volume < 1 || volume > 100)
    return message.reply('📢 Volume must be between 1 and 100.');
  client.distube.setVolume(message, volume);
  message.reply(`🔊 Volume set to ${volume}%`);
}

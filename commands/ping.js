export const name = 'ping';
export function execute(message, args, client) {
  message.reply(`🏓 Pong! Latency is ${client.ws.ping}ms.`);
}

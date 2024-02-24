// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageCreate
import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

/**
 * Handles incoming messages for command processing.
 * Filters out messages from bots and processes commands prefixed with the client's prefix.
 */
export default class MessageCreateEvent extends BaseEvent {
  /**
   * Initializes the message event handler.
   */
  constructor() {
    super("messageCreate");
  }

  /**
   * Runs the command associated with the message, if any.
   * @param {DiscordClient} client - The client instance.
   * @param {Message} message - The message object triggering the event.
   */
  async run(client: DiscordClient, message: Message) {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Process commands with the specified prefix
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);

      // If the command exists, execute it
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}

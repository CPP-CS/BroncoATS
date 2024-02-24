import { Message } from "discord.js";
import BaseContextCommand from "../../../utils/structures/BaseCommand";
import DiscordClient from "../../../client/client";

export default class TestCommand extends BaseContextCommand {
  constructor() {
    super("ping", "BroncoAts", []);
  }

  async setRun(client: DiscordClient, message: Message, args: Array<string>) {
    const startTime = Date.now();
    const reply = await message.channel.send("Ping...");
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    reply.edit(`Pong! \`${responseTime}ms\``);
  }
}

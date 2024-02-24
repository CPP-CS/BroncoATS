// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-threadDelete
import { ThreadChannel } from "discord.js";
import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";

export default class ThreadDeleteEvent extends BaseEvent {
  constructor() {
    super("threadDelete");
  }

  async run(client: DiscordClient, thread: ThreadChannel) {}
}

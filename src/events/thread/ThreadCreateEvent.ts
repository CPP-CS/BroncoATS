// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-threadCreate
import { ThreadChannel } from "discord.js";
import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";

export default class ThreadCreateEvent extends BaseEvent {
  constructor() {
    super("threadCreate");
  }

  async run(client: DiscordClient, thread: ThreadChannel) {}
}

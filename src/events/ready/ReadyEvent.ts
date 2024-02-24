// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready
import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";

export default class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client: DiscordClient) {
    if (client != null) {
      console.log(client?.user?.tag + " has logged in.");
    } else {
      console.log("Bot has logged in.");
    }
  }
}

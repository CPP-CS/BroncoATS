require("dotenv").config();

import {
  registerCommands,
  registerEvents,
  registerSlashCommands,
} from "./utils/registry";
import DiscordClient from "./client/client";
import { GatewayIntentBits } from "discord.js";

try {
  const client = new DiscordClient({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMessageReactions,
    ],
  });

  (async () => {
    await registerCommands(client, "../commands/context");
    await registerEvents(client, "../events");
    await client.login(process.env.BOT_TOKEN ?? "");

    await registerSlashCommands(
      client,
      "../commands/slash",
      process.env.BOT_TOKEN ?? ""
    );
  })();
} catch (err) {
  console.error(err);
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Handle the error or notify the user
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Handle the error or notify the user
});

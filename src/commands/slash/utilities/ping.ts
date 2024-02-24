import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import BaseSlashCommand from "../../../utils/structures/BaseSlashCommand";
import DiscordClient from "../../../client/client";

const command = new BaseSlashCommand()
  .setName("ping")
  .setDescription("Check bot's response time")
  .setRun(
    async (client: DiscordClient, interaction: ChatInputCommandInteraction) => {
      const sent = await interaction.reply({
        content: "Ping...",
        ephemeral: true,
      });
      const latency = sent.createdTimestamp - interaction.createdTimestamp;
      await interaction.editReply(`Pong! Latency is ${latency}ms.`);
    }
  );

export default command;

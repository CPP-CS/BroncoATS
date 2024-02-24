// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-interactionCreate
import {
  CacheType,
  CommandInteractionOptionResolver,
  Interaction,
} from "discord.js";
import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";
import { EmbedBuilder } from "@discordjs/builders";

/**
 * Handles `interactionCreate` events for the Discord bot.
 * This class is specifically designed to process interactions such as slash commands,
 * providing a structured approach to execute corresponding command logic.
 */
export default class InteractionCreateEvent extends BaseEvent {
  constructor() {
    // Initializes the class to handle 'interactionCreate' events.
    super("interactionCreate");
  }

  /**
   * Processes interactions triggered by the user, focusing on chat input commands.
   * It attempts to find a matching command and executes its run method.
   *
   * @param {DiscordClient} client - The extended Discord client instance.
   * @param {Interaction} interaction - The interaction object received from the Discord API.
   */
  async run(client: DiscordClient, interaction: Interaction) {
    // Check if the interaction is a chat input (slash) command.
    if (interaction.isChatInputCommand()) {
      // Attempt to find the command in the client's slashCommands collection.
      let command = client.slashCommands.find(
        (x) => x.name === interaction.commandName
      );

      // If the command doesn't exist or lacks a run method, reply with an error embed.
      if (!command || !command.run) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTimestamp()
              .setColor(0x2b2d31)
              .setDescription(
                "The command you used doesn't have any run function."
              ),
          ],
          ephemeral: true, // Makes the reply only visible to the user.
        });
      }

      // Execute the command's run method if it exists, passing necessary parameters.
      command.run(
        client,
        interaction,
        interaction.options as CommandInteractionOptionResolver<CacheType>
      );
    }
  }
}

import { SlashCommandBuilder } from "@discordjs/builders";
import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import DiscordClient from "../../client/client";

/**
 * Extends the SlashCommandBuilder to provide a framework for defining
 * slash commands and their execution logic within a Discord bot.
 * It adds the capability to handle command execution and autocomplete
 * suggestions through defined callbacks.
 */
export default class BaseSlashCommand extends SlashCommandBuilder {
  type = 1; // Sets the type of the command, where 1 indicates a chat input command.

  // Optional callback function for executing the command.
  run?: (
    client: DiscordClient,
    interaction: ChatInputCommandInteraction,
    options: CommandInteractionOptionResolver
  ) => Promise<any>;

  // Optional callback function for providing autocomplete suggestions.
  autocomplete?: (
    client: DiscordClient,
    interaction: AutocompleteInteraction
  ) => Promise<any>;

  /**
   * Defines the execution logic for the slash command.
   * @param callback A callback function that will be executed when the command is invoked.
   * The callback function receives the Discord client, the command interaction, and the
   * options resolver as arguments.
   * @returns The instance of this SlashCommand for method chaining.
   */
  setRun(
    callback: (
      client: DiscordClient,
      interaction: ChatInputCommandInteraction,
      options: CommandInteractionOptionResolver
    ) => Promise<any>
  ): this {
    this.run = async (client, interaction, options) => {
      try {
        await callback(client, interaction, options);
      } catch (error) {
        console.error("Error executing the command:", error);
        // Optional error handling logic during command execution.
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content:
              "An error occurred while executing the command. Please try again later.",
          });
        } else {
          await interaction.reply({
            content:
              "An error occurred while executing the command. Please try again later.",
            ephemeral: true,
          });
        }
      }
    };
    return this;
  }

  /**
   * Defines the logic for handling autocomplete interactions for the slash command.
   * @param callback A callback function that will be executed during an autocomplete
   * interaction. The callback function receives the Discord client and the autocomplete
   * interaction as arguments.
   * @returns The instance of this SlashCommand for method chaining.
   */
  setAutocomplete(
    callback: (
      client: DiscordClient,
      interaction: AutocompleteInteraction
    ) => Promise<any>
  ): this {
    this.autocomplete = callback;
    return this;
  }
}

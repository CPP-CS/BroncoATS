import path from "path";
import { promises as fs } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import DiscordClient from "../client/client";
import BaseSlashCommand from "./structures/BaseSlashCommand";

/**
 * Recursively registers all command files from a specified directory.
 * This function reads the directory, identifies command files, and registers
 * them to the client.commands collection for later use.
 *
 * @param client - The Discord client instance.
 * @param dir - The directory to search for command files, relative to this file's location.
 */
export async function registerCommands(
  client: DiscordClient,
  dir: string = ""
) {
  // Construct the full path to the directory.
  const filePath = path.join(__dirname, dir);

  // Read the directory contents.
  const files = await fs.readdir(filePath);

  // Iterate through each file or directory in the directory.
  for (const file of files) {
    // Get stats for the current file/directory to check if it's a directory.
    const stat = await fs.lstat(path.join(filePath, file));

    // If it's a directory, recursively call this function to process its contents.
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));

    // If it's a file ending with .js or .ts, import it as a command.
    if (file.endsWith(".js") || file.endsWith(".ts")) {
      const { default: Command } = await import(path.join(filePath, file));
      const command = new Command();

      // Register the command and its aliases with the client.
      client.commands.set(command.getName(), command);
      command.getAliases().forEach((alias: string) => {
        client.commands.set(alias, command);
      });
    }
  }
}

/**
 * Recursively registers all event handler files from a specified directory.
 * This function reads the directory, identifies event handler files, and registers
 * them by attaching them to the appropriate events on the client instance.
 *
 * @param client - The Discord client instance.
 * @param dir - The directory to search for event handler files, relative to this file's location.
 */
export async function registerEvents(client: DiscordClient, dir: string = "") {
  // Construct the full path to the directory.
  const filePath = path.join(__dirname, dir);

  // Read the directory contents.
  const files = await fs.readdir(filePath);

  // Iterate through each file or directory in the directory.
  for (const file of files) {
    // Get stats for the current file/directory to check if it's a directory.
    const stat = await fs.lstat(path.join(filePath, file));

    // If it's a directory, recursively call this function to process its contents.
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));

    // If it's a file ending with .js or .ts, import it as an event handler.
    if (file.endsWith(".js") || file.endsWith(".ts")) {
      const { default: Event } = await import(path.join(filePath, file));
      const event = new Event();

      // Register the event with the client, using its name to bind the event handler.
      client.events.set(event.getName(), event);
      client.on(event.getName(), event.run.bind(event, client));
    }
  }
}

/**
 * Registers all slash commands with the Discord API.
 * This function fetches all slash commands using `loadSlashCommands` and then
 * registers them using Discord's REST API for the bot associated with the provided client.
 *
 * @param client - The Discord client instance.
 * @param dir - The directory to search for slash command files, relative to this file's location.
 * @param token - The bot token used to authenticate with the Discord REST API.
 */
export async function registerSlashCommands(
  client: DiscordClient,
  dir: string = "",
  token: string
) {
  const rest = new REST({ version: "9" }).setToken(token);
  const filePath = path.join(__dirname, dir);

  const commands = await loadSlashCommands(client, filePath);

  try {
    if (client.user) {
      if (commands.length === 0) {
        console.log("No SlashCommand found.");
      } else {
        // Register the commands with the Discord API.
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log(client.user.tag, "Slash (/) commands are registered.");
      }
    }
  } catch (err) {
    console.error(
      client.user ? client.user.tag : "",
      "Error, unable to register slash (/) commands."
    );
    console.error(err);
  }
}

/**
 * Recursively loads all slash commands from the specified directory.
 * This function reads the directory (and subdirectories) for command files,
 * imports them, and constructs an array of command data ready for registration.
 *
 * @param client - The Discord client instance.
 * @param filePath - The full path to the directory to search for slash command files.
 * @returns An array of command data objects ready to be registered with the Discord API.
 */
async function loadSlashCommands(client: DiscordClient, filePath: string = "") {
  const files = await fs.readdir(filePath);
  let commands: any[] = [];

  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) {
      // If it's a directory, recursively load commands from it.
      commands = commands.concat(
        await loadSlashCommands(client, path.join(filePath, file))
      );
    } else if (file.endsWith(".ts") || file.endsWith(".js")) {
      // If it's a command file, import and process it.
      const { default: command } = await import(path.join(filePath, file));

      if (command instanceof BaseSlashCommand) {
        try {
          // Convert the command to its JSON representation and add it to the list.
          commands.push(command.toJSON());
          // If the imported module is a valid instance of BaseSlashCommand, register it.
          client.slashCommands.set(file.split(".")[0].toLowerCase(), command);

          console.log("Loaded slash command:", command.name);
        } catch (err) {
          console.error(
            "Failed to load slash command:",
            command.name,
            "Error:",
            err
          );
        }
      }
    }
  }
  return commands;
}

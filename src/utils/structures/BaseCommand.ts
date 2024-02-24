import { Message } from "discord.js";
import DiscordClient from "../../client/client";

/**
 * Represents an abstract base class for context commands in a Discord bot.
 * This class provides the basic structure for creating new commands by defining
 * common properties and an abstract method for executing the command logic.
 */
export default abstract class BaseContextCommand {
  /**
   * Initializes a new instance of the BaseContextCommand class.
   * @param name The name of the command.
   * @param category The category this command belongs to.
   * @param aliases An array of aliases for the command.
   */
  constructor(
    private name: string,
    private category: string,
    private aliases: Array<string>
  ) {}

  /**
   * Gets the name of the command.
   * @returns The command name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Gets the category of the command.
   * @returns The command category.
   */
  getCategory(): string {
    return this.category;
  }

  /**
   * Gets the aliases of the command.
   * @returns An array of command aliases.
   */
  getAliases(): Array<string> {
    return this.aliases;
  }

  /**
   * Abstract method to be implemented by subclasses to define the command execution logic.
   * @param client The Discord client instance.
   * @param message The message instance that triggered the command.
   * @param args An array of arguments passed to the command, or null if none.
   */
  abstract setRun(
    client: DiscordClient,
    message: Message,
    args: Array<string> | null
  ): Promise<void>;

  /**
   * Executes the command by calling the abstract `setRun` method. Catches and logs any errors.
   * @param client The Discord client instance.
   * @param message The message instance that triggered the command.
   * @param args An array of arguments passed to the command, or null if none.
   */
  async run(
    client: DiscordClient,
    message: Message,
    args: Array<string> | null
  ): Promise<void> {
    try {
      await this.setRun(client, message, args);
    } catch (err) {
      console.error(`Error executing command ${this.getName()}: ${err}`);
    }
  }
}

import { Client, ClientOptions, Collection } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import BaseContextCommand from "../utils/structures/BaseCommand";
import BaseSlashCommand from "../utils/structures/BaseSlashCommand";

/**
 * Represents an enhanced Discord client with additional features for managing
 * commands, slash commands, events, and a custom command prefix.
 */
export default class DiscordClient extends Client {
  // Collection to store message-based commands
  private _commands = new Collection<string, BaseContextCommand>();

  // Collection to store slash commands
  private _slashCommands = new Collection<string, BaseSlashCommand>();

  // Collection to store event handlers
  private _events = new Collection<string, BaseEvent>();

  // Default prefix for message-based commands
  private _prefix: string = "b!";

  /**
   * Initializes a new instance of the DiscordClient.
   * @param {ClientOptions} options - The options for the Discord.js Client.
   */
  constructor(options: ClientOptions) {
    super(options);
  }

  /**
   * Retrieves the collection of message-based commands.
   * @return {Collection<string, BaseContextCommand>} The collection of commands.
   */
  get commands(): Collection<string, BaseContextCommand> {
    return this._commands;
  }

  /**
   * Retrieves the collection of slash commands.
   * @return {Collection<string, BaseSlashCommand>} The collection of slash commands.
   */
  get slashCommands(): Collection<string, BaseSlashCommand> {
    return this._slashCommands;
  }

  /**
   * Retrieves the collection of event handlers.
   * @return {Collection<string, BaseEvent>} The collection of event handlers.
   */
  get events(): Collection<string, BaseEvent> {
    return this._events;
  }

  /**
   * Retrieves the current command prefix.
   * @return {string} The command prefix.
   */
  get prefix(): string {
    return this._prefix;
  }

  /**
   * Sets a new command prefix.
   * @param {string} prefix - The new prefix to be used for message-based commands.
   */
  set prefix(prefix: string) {
    this._prefix = prefix;
  }
}

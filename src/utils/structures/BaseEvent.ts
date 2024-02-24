import DiscordClient from "../../client/client";

/**
 * Represents an abstract base class for event handlers in a Discord bot.
 * This class defines the basic structure for creating new event handlers by
 * specifying a name and providing an abstract method to run the event logic.
 */
export default abstract class BaseEvent {
  /**
   * Initializes a new instance of the BaseEvent class.
   * @param name The name of the event. This is typically the same as the Discord.js event name.
   */
  constructor(private name: string) {}

  /**
   * Gets the name of the event.
   * @returns The event name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Abstract method that must be implemented by subclasses to define the event handling logic.
   * This method will be called when the event is emitted.
   *
   * @param client The Discord client instance, providing access to the Discord API.
   * @param args The arguments provided by the event. These vary depending on the event type.
   */
  abstract run(client: DiscordClient, ...args: any): void;
}

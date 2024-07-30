import { DoStuffActionHandler } from "../cardActions/doStuffActionHandler";
import { HelloWorldCommandHandler } from "../commands/helloworldCommandHandler";
import { ConversationBot } from "@microsoft/teamsfx";
import config from "./config";
import { MembersCommandHandler } from "../commands/membersCommandHandler";
import { HelpCommandHandler } from "../commands/helpCommandHandler";
import { ShowCardCommandHandler } from "../commands/showCardCommandHandler";
import { HeroCardCommandHandler } from "../commands/heroCardCommandHandler";
import { SubmitCommandHandler } from "../commands/submitCommandHandler";
import { TypingCommandHandler } from "../commands/typingCommandHandler";
import { MarkdownCommandHandler } from "../commands/markdownCommandHandler";
import { Poker2ActionHandler } from "../cardActions/poker2ActionHandler";
import { Poker2CommandHandler } from "../commands/poker2CommandHandler";
import { OtherPokerCommandHandler } from "../commands/otherPokerCommandHandler";
import { OtherPokerActionHandler } from "../cardActions/otherPokerActionHandler";

// Create the conversation bot and register the command and card action handlers for your app.
export const conversationBot = new ConversationBot({
  // The bot id and password to create BotFrameworkAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    appId: config.botId,
    appPassword: config.botPassword,
  },
  notification: {
    enabled: true,
  },
  command: {
    enabled: true,
    commands: [
      new HelloWorldCommandHandler(),
      new MembersCommandHandler(),
      new HelpCommandHandler(),
      new ShowCardCommandHandler(),
      new HeroCardCommandHandler(),
      new SubmitCommandHandler(),
      new TypingCommandHandler(),
      new MarkdownCommandHandler(),
      new Poker2CommandHandler(),
      new OtherPokerCommandHandler()
    ],
  },
  cardAction: {
    enabled: true,
    actions: [
      new DoStuffActionHandler(),
      new Poker2ActionHandler(),
      new OtherPokerActionHandler()
    ],
  },
});

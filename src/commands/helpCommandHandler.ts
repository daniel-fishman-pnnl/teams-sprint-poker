import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import helpResponse from "../adaptiveCards/helpResponse.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { ActionCommands } from "../messageExtension/actionCommands";
import { SearchCommands } from "../messageExtension/searchCommands";

export class HelpCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "help";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    const searchMECommands = SearchCommands.filter((command) => !command.hide).map((command) => {
      return {
        command: command.id,
        description: command.description,
      }});
    const actionMECommands = ActionCommands.filter((command) => !command.hide).map((command) => {
      return {
        command: command.id,
        description: command.description,
      };
    });
    const data = {
      actionMECommands,
      searchMECommands,
      botCommands: [
        {
          "command": "helloWorld",
          "description": "show workflow bot Adaptive Card"
        },
        {
          "command": "members",
          "description": "list all members in conversation"
        },
        {
          "command": "show agenda",
          "description": "show sample Adaptive Card agenda"
        },
        {
          "command": "show flight",
          "description": "show sample Adaptive Card flight details"
        },
        {
          "command": "poker",
          "description": "start a round of sprint poker"
        },
        {
          "command": "pointGame",
          "description": "a different design for a game of sprint poker"
        }
      ]
    }

    const cardJson = AdaptiveCards.declare(helpResponse).render(data);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}

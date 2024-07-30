import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse, Activity, MessageFactory, CardFactory } from "botbuilder";
import { CommandMessage, InvokeResponseFactory, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import responseCard from "../adaptiveCards/pokerCard2.json";

export class Poker2CommandHandler implements TeamsFxBotCommandHandler {
    /**
     * A global unique string associated with the `Action.Execute` action.
     * The value should be the same as the `verb` property which you define in your adaptive card JSON.
     */
    triggerVerb = "poker";
    triggerPatterns: TriggerPatterns = "poker";

    async handleCommandReceived(
      context: TurnContext,
      message: CommandMessage
    ): Promise<string | Partial<Activity> | void> { {
      const cardData = {
        score: 0,
        undecided: 0,
        votes: 0,
        newGame: true
      };
      const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
      return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
  }
}

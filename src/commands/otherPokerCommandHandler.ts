import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse, Activity, MessageFactory, CardFactory } from "botbuilder";
import { CommandMessage, InvokeResponseFactory, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import responseCard from "../adaptiveCards/otherPokerCard.json";

/**
 * The `DoStuffActionHandler` registers an action with the `TeamsFxBotActionHandler` and responds
 * with an Adaptive Card if the user clicks the Adaptive Card action with `triggerVerb`.
 */
export class OtherPokerCommandHandler implements TeamsFxBotCommandHandler {
    /**
     * A global unique string associated with the `Action.Execute` action.
     * The value should be the same as the `verb` property which you define in your adaptive card JSON.
     */
    triggerVerb = "pointGame";
    triggerPatterns: TriggerPatterns = "pointGame";


    async handleCommandReceived(
      context: TurnContext,
      message: CommandMessage
    ): Promise<string | Partial<Activity> | void> { {
      const cardData = {
        voteHalfCount: 0,
        voteOneCount: 0,
        voteTwoCount: 0,
        voteThreeCount: 0,
        voteFiveCount: 0,
        voteEightCount: 0,
        voteThirteenCount: 0,
        voteTwentyOneCount: 0,
        voteUnknownCount: 0,
        newGame: true
      };
      const cardJson = AdaptiveCards.declare(responseCard).render(cardData);
      return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
  }
}

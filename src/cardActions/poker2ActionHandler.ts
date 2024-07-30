import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse } from "botbuilder";
import { TeamsFxAdaptiveCardActionHandler, InvokeResponseFactory, AdaptiveCardResponse } from "@microsoft/teamsfx";
import pokerCard from "../adaptiveCards/pokerCard2.json";

export class Poker2ActionHandler implements TeamsFxAdaptiveCardActionHandler {
  /**
   * A global unique string associated with the `Action.Execute` action.
   * The value should be the same as the `verb` property which you define in your adaptive card JSON.
   */
  triggerVerb = "vote";
  adaptiveCardResponse = AdaptiveCardResponse.ReplaceForAll;

  voteCount = 0;
  votes = [];
  undecided = 0;

  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    console.log(actionData);
    console.log(context);
    const voteValueRaw = actionData['acPollChoices'];
    const isNewGame = actionData['newGame'] === true;

    if (isNewGame) {
      this.voteCount = 0;
      this.votes = [];
      this.undecided = 0;
    }

    if (voteValueRaw === '???') {
      this.undecided++;
    } else {
      const voteValue = Number(actionData['acPollChoices']);
      this.votes.push(voteValue);
    }
    this.voteCount++;
    const average = this.votes.length > 0 ? this.votes.reduce((a, b) => a + b) / this.votes.length : 0;
    const cardJson = AdaptiveCards.declare(pokerCard).render({
      'votes': `${this.votes.length}`,
      'score': `${Math.round(average)}`,
      'undecided': `${this.undecided}`
    });
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }
}

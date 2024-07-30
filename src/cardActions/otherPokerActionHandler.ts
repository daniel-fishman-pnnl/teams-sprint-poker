import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { TurnContext, InvokeResponse } from "botbuilder";
import { TeamsFxAdaptiveCardActionHandler, InvokeResponseFactory, AdaptiveCardResponse } from "@microsoft/teamsfx";
import pokerCard from "../adaptiveCards/otherPokerCard.json";

export class OtherPokerActionHandler implements TeamsFxAdaptiveCardActionHandler {
  /**
   * A global unique string associated with the `Action.Execute` action.
   * The value should be the same as the `verb` property which you define in your adaptive card JSON.
   */
  triggerVerb = "click";
  adaptiveCardResponse = AdaptiveCardResponse.ReplaceForAll;

  voteHalfCount = 0;
  voteOneCount = 0;
  voteTwoCount = 0;
  voteThreeCount = 0;
  voteFiveCount = 0;
  voteEightCount = 0;
  voteThirteenCount = 0;
  voteTwentyOneCount = 0;
  voteUnknownCount = 0;
  undecided = 0;

  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse> {
    console.log(actionData);
    console.log(context);
    const vote = actionData['vote'];
    const isNewGame = actionData['newGame'] === true;

    if (isNewGame) {
      this.voteHalfCount = 0;
      this.voteOneCount = 0;
      this.voteTwoCount = 0;
      this.voteThreeCount = 0;
      this.voteFiveCount = 0;
      this.voteEightCount = 0;
      this.voteThirteenCount = 0;
      this.voteTwentyOneCount = 0;
      this.voteUnknownCount = 0;
      this.undecided = 0;
    }

    switch(vote){
      case 'half':
        this.voteHalfCount++;
        break;
      case 'one':
        this.voteOneCount++;
        break;
      case 'two':
        this.voteTwoCount++;
        break;
      case 'three':
        this.voteThreeCount++;
        break;
      case 'five':
        this.voteFiveCount++;
        break;
      case 'eight':
        this.voteEightCount++;
        break;
      case 'thirteen':
        this.voteThirteenCount++;
        break;
      case 'twentyone':
        this.voteTwentyOneCount++;
        break;
      case 'unknown':
        this.voteUnknownCount++;
        break;
    }

    const cardJson = AdaptiveCards.declare(pokerCard).render({
      voteHalfCount: this.voteHalfCount,
      voteOneCount: this.voteOneCount,
      voteTwoCount: this.voteTwoCount,
      voteThreeCount: this.voteThreeCount,
      voteFiveCount: this.voteFiveCount,
      voteEightCount: this.voteEightCount,
      voteThirteenCount: this.voteThirteenCount,
      voteTwentyOneCount: this.voteTwentyOneCount,
      voteUnknownCount: this.voteUnknownCount,
      newGame: false
    });
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }
}

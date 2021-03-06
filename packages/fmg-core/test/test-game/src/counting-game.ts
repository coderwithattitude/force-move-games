import { State, toHex32, padBytes32 } from '../../../src';

class CountingGame {
  static preFundSetupState(opts) { return new PreFundSetupState(opts); }
  static PostFundSetupState(opts) { return new PostFundSetupState(opts); }
  static gameState(opts) { return new GameState(opts); }
  static concludeState(opts) { return new ConcludeState(opts); }
}

class CountingBaseState extends State {
  gameCounter: number;

  constructor({ channel, turnNum, stateCount, resolution, gameCounter }) {
    super({ channel, turnNum, stateCount, resolution, stateType: undefined });
    this.gameCounter = gameCounter;
    this.initialize();
  }

  initialize() {}

  toHex() {
    return super.toHex() + toHex32(this.gameCounter).substr(2);
  }
}

class PreFundSetupState extends CountingBaseState {
  initialize() { this.stateType = State.StateTypes.PREFUNDSETUP; }
}

class PostFundSetupState extends CountingBaseState {
  initialize() { this.stateType = State.StateTypes.POSTFUNDSETUP; }
}

class GameState extends CountingBaseState {
  initialize() { this.stateType = State.StateTypes.GAME; }
}

class ConcludeState extends CountingBaseState {
  initialize() { this.stateType = State.StateTypes.CONCLUDE; }
}

export { CountingGame };

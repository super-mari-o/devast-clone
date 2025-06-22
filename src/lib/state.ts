/**
 * ゲーム状態（ロビー、プレイ中、リザルトなど）の切り替え処理
 */

export enum GameState {
  LOADING = 'loading',
  MENU = 'menu',
  PLAYING = 'playing',
  DEAD = 'dead',
  VICTORY = 'victory',
  DISCONNECTED = 'disconnected'
}

export class StateManager {
  private currentState: GameState = GameState.LOADING;

  public getState = (): GameState => {
    return this.currentState;
  };

  public setState = (newState: GameState): void => {
    console.log(`[State] Transition: ${this.currentState} -> ${newState}`);
    this.currentState = newState;
  };

  public is = (state: GameState): boolean => {
    return this.currentState === state;
  };
}

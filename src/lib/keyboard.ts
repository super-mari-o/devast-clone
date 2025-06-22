/**
 * キー入力状態（WASD、ショートカット、チャット送信など）
 */

export class Keyboard {
  private keys: Record<string, boolean> = {};

  constructor() {
    this.bindEvents();
  }

  private bindEvents = (): void => {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    this.keys[event.code] = true;
  };

  private onKeyUp = (event: KeyboardEvent): void => {
    this.keys[event.code] = false;
  };

  public isPressed = (key: string): boolean => {
    return !!this.keys[key];
  };

  public reset = (): void => {
    this.keys = {};
  };
}

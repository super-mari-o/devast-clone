import { Mouse } from '$lib/mouse';
import { Keyboard } from '$lib/keyboard';
import { TouchInput } from '$lib/touch';

export class InputManager {
  private keyboard = new Keyboard();
  private touch = new TouchInput();

  public isKeyPressed = (key: string): boolean => {
    return this.keyboard.isPressed(key);
  };

  public isTouching = (): boolean => {
    return this.touch.isActive();
  };

  public getTouchPosition = (): { x: number; y: number } => {
    return this.touch.getTouchPosition();
  };

  public getMousePosition = (): { x: number; y: number } => {
    return { x: Mouse.x, y: Mouse.y };
  };

  public reset = (): void => {
    this.keyboard.reset();
    this.touch.reset();
  };
}

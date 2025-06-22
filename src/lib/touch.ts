/**
 * モバイルタッチ対応処理
 */

export class TouchInput {
  private isTouching = false;
  private touchX = 0;
  private touchY = 0;

  constructor() {
    this.bindEvents();
  }

  private bindEvents = (): void => {
    window.addEventListener('touchstart', this.onTouchStart, { passive: false });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd);
    window.addEventListener('touchcancel', this.onTouchEnd);
  };

  private onTouchStart = (e: TouchEvent): void => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.isTouching = true;
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;
    }
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;
    }
  };

  private onTouchEnd = (_e: TouchEvent): void => {
    this.isTouching = false;
  };

  public getTouchPosition = (): { x: number; y: number } => {
    return { x: this.touchX, y: this.touchY };
  };

  public isActive = (): boolean => {
    return this.isTouching;
  };

  public reset = (): void => {
    this.isTouching = false;
    this.touchX = 0;
    this.touchY = 0;
  };
}
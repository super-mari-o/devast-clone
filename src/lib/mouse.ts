/**
 * マウス入力処理
 */

import { scaleby, canw2ns, canh2ns } from '$lib/canvas';
import { Math2d } from '$lib/math2d';

export enum MouseState {
  MOVE = 0,
  DOWN = 1,
  UP = 2
}

export class LocalMouseEvent {
  clientX = 0;
  clientY = 0;
  altKey = false;
  ctrlKey = false;
  preventDefault = () => {};
}

export namespace Mouse {
  export let state: MouseState = MouseState.MOVE;
  export let x = 0;
  export let y = 0;
  export let sx = 0;
  export let sy = 0;
  export let angle = 0;
  export let dist = 0;

  export const updatePosition=(event: MouseEvent, newState: MouseState): void=> {
    if (newState !== MouseState.MOVE) {
      state = newState;
    }
    sx = Math.floor(event.clientX);
    sy = Math.floor(event.clientY);
    x = Math.floor(sx / scaleby);
    y = Math.floor(sy / scaleby);
  }

  export const updateAngle=(): void=> {
    angle = Math2d.angle(1, 0, x - canw2ns, y - canh2ns);
  }

  export const updateDist=(): void=> {
    dist = Math2d.dist(canw2ns, canh2ns, x, y);
  }

  export const updatePosAngle=(event: MouseEvent, newState: MouseState): void=> {
    updatePosition(event, newState);
    updateAngle();
  }

  export const updateAll=(event: MouseEvent, newState: MouseState): void=> {
    updatePosition(event, newState);
    updateAngle();
    updateDist();
  }

  export const touchToMouseEvent=(event: MouseEvent, touchEvent: TouchEvent, touch: Touch): void =>{
    event.clientX = touch.clientX;
    event.clientY = touch.clientY;
    event.altKey = touchEvent.altKey;
    event.ctrlKey = touchEvent.ctrlKey;
  }
}

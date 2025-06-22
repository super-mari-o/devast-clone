/**
 * ゲームイベントハンドリング
 */

import { Mouse } from '$lib/mouse';
import { Renderer } from '$lib/canvas';

// イベントハンドラー登録用のインターフェース（通信イベント・UI用）
export interface EventHandlers {
  onHandshake?: (data: any) => void;
  onPlayerDie?: (data: any) => void;
  onChatMessage?: (data: any) => void;
  onJoin?: (data: any) => void;
  onLeave?: (data: any) => void;
  onUpdate?: (data: any) => void;
  [key: string]: ((data: any) => void) | undefined;
}

export class Handlers {
  private handlers: EventHandlers = {};

  constructor(private renderer?: Renderer) {}

  register(event: keyof EventHandlers, handler: (data: any) => void): void {
    this.handlers[event] = handler;
  }

  handle(event: keyof EventHandlers, data: any): void {
    const handler = this.handlers[event];
    if (handler) handler(data);
  }

  unregister(event: keyof EventHandlers): void {
    delete this.handlers[event];
  }

  clear(): void {
    this.handlers = {};
  }
}

// 使用例
// const handlers = new Handlers();
// handlers.register("onChatMessage", data => console.log(data));
// handlers.handle("onChatMessage", { message: "Hello" });
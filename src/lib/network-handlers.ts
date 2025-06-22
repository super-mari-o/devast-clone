/**
 * サーバーから受信する各イベントのハンドラ管理（ゲームロジック連携）
 */

import { Handlers } from '$lib/handlers';
import { Socket } from '$lib/socket';

export class NetworkHandlers {
  private handlers: Handlers;
  private socket: Socket;

  constructor(socket: Socket, handlers: Handlers) {
    this.socket = socket;
    this.handlers = handlers;
  }

  public initialize = (): void => {
    this.socket.on('message', this.handleMessage);
  };

  private handleMessage = (data: any): void => {
    if (!data || typeof data !== 'object' || !data.type) return;
    const type = data.type as string;
    const payload = data.payload ?? data;
    this.handlers.handle(type, payload);
  };
}

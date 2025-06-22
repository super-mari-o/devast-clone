/**
 * WebSocket通信の確立・送受信・再接続管理など
 */

export type SocketEventMap = {
  open: () => void;
  close: (event: CloseEvent) => void;
  error: (event: Event) => void;
  message: (data: any) => void;
};

export class Socket {
  private ws?: WebSocket;
  private url: string;
  private isConnected = false;
  private listeners: Partial<SocketEventMap> = {};

  constructor(url: string) {
    this.url = url;
  }

  public connect = (): void => {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      this.isConnected = true;
      this.listeners.open?.();
    };

    this.ws.onclose = (e) => {
      this.isConnected = false;
      this.listeners.close?.(e);
    };

    this.ws.onerror = (e) => {
      this.listeners.error?.(e);
    };

    this.ws.onmessage = (msg) => {
      let data: any;
      try {
        data = JSON.parse(msg.data);
      } catch {
        data = msg.data;
      }
      this.listeners.message?.(data);
    };
  };

  public send = (data: any): void => {
    if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
      const payload = typeof data === 'string' ? data : JSON.stringify(data);
      this.ws.send(payload);
    }
  };

  public close = (): void => {
    this.ws?.close();
  };

  public on = <K extends keyof SocketEventMap>(event: K, listener: SocketEventMap[K]): void => {
    this.listeners[event] = listener;
  };
}

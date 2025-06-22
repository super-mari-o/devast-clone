/**
 * チャットウィンドウ描画・入力・履歴スクロールなど
 */

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

export class Chat {
  private messages: ChatMessage[] = [];
  private maxMessages = 100;
  private inputBuffer = '';
  private isFocused = false;

  public addMessage = (msg: ChatMessage): void => {
    this.messages.push(msg);
    if (this.messages.length > this.maxMessages) {
      this.messages.shift();
    }
  };

  public getMessages = (): ChatMessage[] => {
    return [...this.messages];
  };

  public setInput = (text: string): void => {
    this.inputBuffer = text;
  };

  public getInput = (): string => {
    return this.inputBuffer;
  };

  public submitMessage = (sender: string): ChatMessage | null => {
    const trimmed = this.inputBuffer.trim();
    if (!trimmed) return null;
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      sender,
      text: trimmed,
      timestamp: Date.now()
    };
    this.addMessage(msg);
    this.inputBuffer = '';
    return msg;
  };

  public setFocused = (focused: boolean): void => {
    this.isFocused = focused;
  };

  public isChatFocused = (): boolean => {
    return this.isFocused;
  };
}

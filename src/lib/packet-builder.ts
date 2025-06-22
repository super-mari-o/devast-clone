/**
 * サーバーへ送信するパケット構築（エンコード）処理
 */

export class PacketBuilder {
  private buffer: any = {};

  constructor(private type: string) {
    this.buffer.type = type;
  }

  public write = (key: string, value: any): PacketBuilder => {
    this.buffer[key] = value;
    return this;
  };

  public toJSON = (): any => {
    return this.buffer;
  };

  public toString = (): string => {
    return JSON.stringify(this.buffer);
  };

  public static from = (type: string): PacketBuilder => {
    return new PacketBuilder(type);
  };
}

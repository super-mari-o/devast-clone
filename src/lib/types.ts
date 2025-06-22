/**
 * 共通型定義インターフェース（Entity, Packet, PlayerState など）
 */

export interface Vector2 {
  x: number;
  y: number;
}

export interface PlayerState {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  hp: number;
  alive: boolean;
}

export interface Packet {
  type: string;
  payload?: any;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

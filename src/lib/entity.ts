/**
 * プレイヤー・NPC・オブジェクトなどの構造と更新処理
 */

import { DrawUtils } from '$lib/draw';
import { CanvasUtils } from '$lib/canvas';
import { Math2d } from '$lib/math2d';

export interface EntityData {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  name?: string;
}

export class Entity {
  public id: string;
  public x: number;
  public y: number;
  public radius: number;
  public color: string;
  public name?: string;

  constructor(data: EntityData) {
    this.id = data.id;
    this.x = data.x;
    this.y = data.y;
    this.radius = data.radius;
    this.color = data.color;
    this.name = data.name;
  }

  public update = (data: Partial<EntityData>): void => {
    if (data.x !== undefined) this.x = data.x;
    if (data.y !== undefined) this.y = data.y;
    if (data.radius !== undefined) this.radius = data.radius;
    if (data.color !== undefined) this.color = data.color;
    if (data.name !== undefined) this.name = data.name;
  };

  public draw = (): void => {
    DrawUtils.fillRect(
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2,
      this.color
    );
  };
}

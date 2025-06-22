/**
 * マップ構造・地形・ゾーン管理など
 */

import { CanvasUtils } from '$lib/canvas';
import { DrawUtils } from '$lib/draw';
import { Entity, EntityData } from '$lib/entity';

export class World {
  private entities: Map<string, Entity> = new Map();

  public addEntity = (data: EntityData): void => {
    if (!this.entities.has(data.id)) {
      this.entities.set(data.id, new Entity(data));
    }
  };

  public updateEntity = (id: string, data: Partial<EntityData>): void => {
    const entity = this.entities.get(id);
    if (entity) {
      entity.update(data);
    }
  };

  public removeEntity = (id: string): void => {
    this.entities.delete(id);
  };

  public clear = (): void => {
    this.entities.clear();
  };

  public update = (): void => {
    // 必要ならエンティティにフレーム単位の更新処理を実装
  };

  public draw = (): void => {
    this.entities.forEach(entity => {
      entity.draw();
    });
  };
}

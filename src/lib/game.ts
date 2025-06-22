/**
 * ゲームループ・エンティティ更新・プレイヤー処理
 */

import { Handlers } from '$lib/handlers';
import { Mouse } from '$lib/mouse';
import { CanvasUtils } from '$lib/canvas';
import { DrawUtils } from '$lib/draw';
import { GUI } from '$lib/gui';
import { Math2d } from '$lib/math2d';
import { MathUtils } from '$lib/math';

export class Game {
  private isRunning = false;
  private lastUpdate = 0;
  private handlers = new Handlers();

  public init = (): void => {
    this.handlers.register('onHandshake', this.onHandshake);
    this.handlers.register('onUpdate', this.onUpdate);

    CanvasUtils.initAnimatedCanvas({
      draw: this.render,
      update: this.update
    });

    this.isRunning = true;
  };

  private onHandshake = (data: any): void => {
    console.log('[Handshake]', data);
    // プレイヤーデータ初期化など
  };

  private onUpdate = (data: any): void => {
    // ゲーム状態更新処理
  };

  private update = (): void => {
    // 毎フレームのロジック更新（エンティティ、入力など）
    // 例: 入力チェックや移動処理
  };

  private render = (): void => {
    DrawUtils.fillRect(0, 0, CanvasUtils.canw, CanvasUtils.canh, '#000');
    // GUI, プレイヤー, マップなどの描画呼び出し
  };
}
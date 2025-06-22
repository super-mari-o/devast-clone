/**
 * GUI要素（ボタン・スプライト）
 */

import { ctx, scaleby } from '$lib/canvas';
import { CanvasUtils } from '$lib/draw'; // 依存するなら draw-utils に描画関数を移動している前提

export enum ButtonState {
  OUT = 0,
  IN = 1,
  CLICK = 2
}

export interface GUIComponent {
  pos: { x: number; y: number; disable: number };
  draw(): void;
  show(): void;
  hide(): void;
}

export const createSprite=(
  width: number,
  height: number,
  src: string,
  frameWidth: number,
  frameTime: number
): GUIComponent=> {
  const pos = { x: 0, y: 0, disable: 0 };
  const img = CanvasUtils.loadImage(src);
  let frame = 0;
  let elapsed = 0;

  const draw=(): void=> {
    if (!img.isLoaded) return;
    elapsed += Math.min(CanvasUtils.delta, 3 * frameTime);
    if (elapsed > frameTime) {
      elapsed -= frameTime;
      frame = Math.floor((frame + 1) % (img.width / frameWidth));
    }
    ctx.drawImage(img, frame * frameWidth, 0, frameWidth, img.height,
      pos.x, pos.y, width * scaleby, height * scaleby);
  }

  return {
    pos,
    draw,
    show: () => (pos.disable = 0),
    hide: () => (pos.disable = 1)
  };
}

export const createBackground=(
  width: number,
  height: number,
  src?: string
): GUIComponent =>{
  const pos = { x: 0, y: 0, disable: 0 };
  let img = src ? CanvasUtils.loadImage(src) : undefined;
  if (!img) pos.disable = 1;

  return {
    pos,
    draw() {
      if (pos.disable || !img?.isLoaded) return;
      ctx.drawImage(img, 0, 0, img.width, img.height, pos.x, pos.y, width * scaleby, height * scaleby);
    },
    show: () => (pos.disable = 0),
    hide: () => (pos.disable = 1)
  };
}

export const createButton=(
  width: number,
  height: number,
  srcs?: string[]
): GUIComponent & {
  trigger(): boolean;
  setState(s: ButtonState): void;
  getState(): ButtonState;
  setImages(srcs: string[], imgs: HTMLImageElement[]): void;
} =>{
  const pos = { x: 0, y: 0, disable: 0 };
  let state: ButtonState = ButtonState.OUT;
  let images: HTMLImageElement[] = [];

  if (srcs) {
    images = srcs.map(s => CanvasUtils.loadImage(s));
  } else {
    pos.disable = 1;
  }

  return {
    pos,
    draw() {
      if (pos.disable) return;
      const img = images[state];
      if (!img?.isLoaded) return;
      ctx.drawImage(img, 0, 0, img.width, img.height, pos.x, pos.y, width * scaleby, height * scaleby);
    },
    show: () => (pos.disable = 0),
    hide: () => (pos.disable = 1),
    trigger() {
      if (pos.disable) return false;
      const mouseX = CanvasUtils.options.ratioX * CanvasUtils.canvas.width / scaleby;
      const mouseY = CanvasUtils.options.ratioY * CanvasUtils.canvas.height / scaleby;
      // 実際のマウス状態取得は外部から注入が理想
      return true; // 仮で常にtrue返す
    },
    setState: (s) => (state = s),
    getState: () => state,
    setImages(srcs, imgs) {
      images = imgs.map((img, i) => img?.isLoaded ? img : CanvasUtils.loadImage(srcs[i]));
    }
  };
}

export const renderText=(
  text: string,
  font: string,
  color: string,
  height: number,
  width?: number,
  background?: string,
  paddingHorz = 0,
  paddingVert = 0,
  border = 0,
  borderColor?: string,
  opacity = 1,
  radius?: number,
  borderText?: string,
  borderTextWidth = 0,
  weight?: string
): HTMLCanvasElement=> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "middle";
  ctx.font = `${weight ? weight + ' ' : ''}${height}px ${font}`;

  const measuredWidth = ctx.measureText(text).width;
  const finalWidth = width !== undefined ? Math.min(measuredWidth, width) : measuredWidth;

  canvas.width = finalWidth + paddingHorz;
  canvas.height = height + paddingVert;

  if (background) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = background;
    if (radius !== undefined) {
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.arcTo(finalWidth, 0, finalWidth, height, radius);
      ctx.arcTo(finalWidth, height, 0, height, radius);
      ctx.arcTo(0, height, 0, 0, radius);
      ctx.arcTo(0, 0, finalWidth, 0, radius);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.globalAlpha = 1;
    if (border > 0 && borderColor) {
      ctx.lineWidth = border;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }
  }

  ctx.font = `${weight ? weight + ' ' : ''}${height}px ${font}`;
  if (borderText) {
    ctx.strokeStyle = borderText;
    ctx.lineWidth = borderTextWidth;
    ctx.strokeText(text, paddingHorz / 2, paddingVert / 2 + height / 2, finalWidth);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, paddingHorz / 2, paddingVert / 2 + height / 2, finalWidth);

  (canvas as any).wh = canvas.width / 2;
  (canvas as any).h2 = canvas.height / 2;

  return canvas;
}
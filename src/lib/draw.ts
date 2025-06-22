/**
 * 図形・画像の描画ユーティリティ
 */

import { ctx, scaleby } from './canvas';

export namespace DrawUtils {
  export const fillRect=(x: number, y: number, w: number, h: number, color: string): void=> {
    ctx.fillStyle = color;
    ctx.fillRect(x * scaleby, y * scaleby, w * scaleby, h * scaleby);
  }

  export const strokeRect=(x: number, y: number, w: number, h: number, color: string, width = 1): void=> {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.strokeRect(x * scaleby, y * scaleby, w * scaleby, h * scaleby);
  }

  export const rect=(x: number, y: number, w: number, h: number): void=> {
    ctx.rect(x * scaleby, y * scaleby, w * scaleby, h * scaleby);
  }

  export const circle=(x: number, y: number, r: number): void=> {
    ctx.beginPath();
    ctx.arc(x * scaleby, y * scaleby, r * scaleby, 0, Math.PI * 2);
    ctx.fill();
  }

  export const strokeCircle=(x: number, y: number, r: number, color: string, width = 1): void=> {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.arc(x * scaleby, y * scaleby, r * scaleby, 0, Math.PI * 2);
    ctx.stroke();
  }

  export const roundRect=(x: number, y: number, w: number, h: number, r: number): void=> {
    const s = scaleby;
    const _x = x * s, _y = y * s, _w = w * s, _h = h * s, _r = r * s;
    ctx.beginPath();
    ctx.moveTo(_x + _r, _y);
    ctx.lineTo(_x + _w - _r, _y);
    ctx.quadraticCurveTo(_x + _w, _y, _x + _w, _y + _r);
    ctx.lineTo(_x + _w, _y + _h - _r);
    ctx.quadraticCurveTo(_x + _w, _y + _h, _x + _w - _r, _y + _h);
    ctx.lineTo(_x + _r, _y + _h);
    ctx.quadraticCurveTo(_x, _y + _h, _x, _y + _h - _r);
    ctx.lineTo(_x, _y + _r);
    ctx.quadraticCurveTo(_x, _y, _x + _r, _y);
    ctx.closePath();
  }

  export const drawImageHd=(
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ): void =>{
    if (!(img as any).isLoaded) return;
    ctx.drawImage(img, 0, 0, img.width, img.height,
      x * scaleby, y * scaleby, w * scaleby, h * scaleby);
  }

  export const drawImageHdCrop=(
    img: HTMLImageElement,
    sx: number, sy: number, sw: number, sh: number,
    dx: number, dy: number, dw: number, dh: number
  ): void =>{
    if (!(img as any).isLoaded) return;
    ctx.drawImage(img, sx, sy, sw, sh, dx * scaleby, dy * scaleby, dw * scaleby, dh * scaleby);
  }
}

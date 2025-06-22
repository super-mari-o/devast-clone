/**
 * キャンバス初期化・サイズ調整
 */

export type Renderer = {
  draw: () => void;
  update: () => void;
};

export interface ImageWithMeta extends HTMLImageElement {
  isLoaded: number;
  wh?: number;
  h2?: number;
}

interface CanvasOptions {
  resizeMethod: number;
  size: number;
  aliasing: boolean;
  deviceRatio: number;
  scheduledRatio: number;
  backingStoreRatio: number;
  forceResolution: number;
  ratio: number;
  ratioX: number;
  ratioY: number;
  can: string;
  bod: string;
}

const __RESIZE_METHOD_SCALE__ = 1;
const __RESIZE_METHOD_CSS__ = 0;

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let scaleby = 1;

let canw = 0, canh = 0, canw2 = 0, canh2 = 0, canw4 = 0, canh4 = 0;
let canwns = 0, canhns = 0, canw2ns = 0, canh2ns = 0, canw4ns = 0, canh4ns = 0;

let previousTimestamp = 0;
let delta = 0;
let fpsAvg = 100;
let canvasQuality = 1;

const wmWnm = 5;
let nnW = 0, vision = 0, WVNmV = 0, wMmNw = 0;
const VVWwv = new Array<number>(wmWnm);

const options: CanvasOptions = {
  resizeMethod: __RESIZE_METHOD_SCALE__,
  size: window.innerWidth,
  aliasing: true,
  deviceRatio: window.devicePixelRatio || 1,
  scheduledRatio: window.devicePixelRatio || 1,
  backingStoreRatio: 1,
  forceResolution: 0,
  ratio: 0,
  ratioX: 1,
  ratioY: 1,
  can: "can",
  bod: "bod"
};

let renderer: Renderer;

const setRenderer = (r: Renderer) => {
  renderer = r;
}

const initAnimatedCanvas =(
  r: Renderer,
  resizeMethod?: number,
  canId?: string,
  bodId?: string,
  size?: number,
  ratio?: number,
  aliasing?: boolean
): void =>  {
  setRenderer(r);
  if (resizeMethod !== undefined) options.resizeMethod = resizeMethod;
  if (canId) options.can = canId;
  if (bodId) options.bod = bodId;
  if (size !== undefined) options.size = size;
  if (ratio !== undefined) options.ratio = ratio;
  if (aliasing !== undefined) options.aliasing = aliasing;

  canvas = document.getElementById(options.can) as HTMLCanvasElement;
  ctx = canvas.getContext("2d")!;

  options.backingStoreRatio =
    (ctx as any).webkitBackingStorePixelRatio ||
    (ctx as any).mozBackingStorePixelRatio ||
    (ctx as any).msBackingStorePixelRatio ||
    (ctx as any).oBackingStorePixelRatio ||
    (ctx as any).backingStorePixelRatio ||
    1;

  initReqAnimationFrame();

  canvas.oncontextmenu = () => false;

  const win = document.getElementById(options.bod)!;
  win.ondragstart = () => false;
  win.ondrop = () => false;
  win.onresize = bodOnResize;

  bodOnResize();
  vNwwn();
}

const initReqAnimationFrame =() =>  {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for (const vendor of vendors) {
    if (!window.requestAnimationFrame) {
      (window as any).requestAnimationFrame = (window as any)[vendor + 'RequestAnimationFrame'];
      (window as any).cancelAnimationFrame =
        (window as any)[vendor + 'CancelAnimationFrame'] ||
        (window as any)[vendor + 'CancelRequestAnimationFrame'];
    }
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      const currTime = Date.now();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame =  (id)=> {
      clearTimeout(id);
    };
  }
}

const bodOnResize=(): void =>  {
  let width: number;
  let height: number;
  if (options.resizeMethod === __RESIZE_METHOD_CSS__) {
    const ratio = window.innerWidth > window.innerHeight
      ? window.innerHeight / window.innerWidth
      : window.innerWidth / window.innerHeight;
    if (window.innerWidth > window.innerHeight) {
      width = options.size;
      height = Math.floor(width * ratio);
    } else {
      height = options.size;
      width = Math.floor(height * ratio);
    }
  } else {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  canw = width;
  canh = height;
  canw2 = Math.floor(canw / 2);
  canh2 = Math.floor(canh / 2);
  canw4 = Math.floor(canw / 4);
  canh4 = Math.floor(canh / 4);

  options.ratioX = canw / window.innerWidth;
  options.ratioY = canh / window.innerHeight;

  let scaleRatio = options.scheduledRatio / options.backingStoreRatio;
  if (options.ratio !== 0) scaleRatio *= options.ratio;

  canvas.width = canw * scaleRatio;
  canvas.height = canh * scaleRatio;

  if (options.resizeMethod === __RESIZE_METHOD_SCALE__) {
    scaleby = Math.max(
      height / ((options.size * 11) / 16),
      width / options.size
    );
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }

  canwns = canw / scaleby;
  canhns = canh / scaleby;
  canw2ns = canw2 / scaleby;
  canh2ns = canh2 / scaleby;
  canw4ns = canw4 / scaleby;
  canh4ns = canh4 / scaleby;

  ctx.scale(scaleRatio, scaleRatio);
  setAntialiasing(ctx, options.aliasing);
  renderer.update();
}

const setAntialiasing=(ctx: CanvasRenderingContext2D, enable: boolean): void=> {
  (canvas as any).style.imageRendering = enable ? 'auto' : 'pixelated';
  ctx.imageSmoothingEnabled = enable;
  (ctx as any).webkitImageSmoothingEnabled = enable;
  (ctx as any).mozImageSmoothingEnabled = enable;
  (ctx as any).msImageSmoothingEnabled = enable;
  (ctx as any).oImageSmoothingEnabled = enable;
}

const vNwwn=(timestamp?: number): void=> {
  window.requestAnimationFrame(vNwwn);
  if (timestamp !== undefined) {
    delta = timestamp - previousTimestamp;
    previousTimestamp = timestamp;
  }
  // FPS calc here if needed...
  renderer.draw();
}

export const CanvasUtils = {
  options,
  initAnimatedCanvas,
  setAntialiasing,
  setRenderer
};

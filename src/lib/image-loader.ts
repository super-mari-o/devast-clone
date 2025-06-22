/**
 * loadImage など、画像の読み込みとキャッシュ管理
 */

export interface LoadedImage extends HTMLImageElement {
  isLoaded: boolean;
  wh?: number;
  h2?: number;
}

export class ImageLoader {
  private static cache: Record<string, LoadedImage> = {};

  public static load = (src: string): LoadedImage => {
    if (ImageLoader.cache[src]) return ImageLoader.cache[src];

    const img = new Image() as LoadedImage;
    img.isLoaded = false;

    img.onload = () => {
      img.isLoaded = true;
      img.wh = img.width / 2;
      img.h2 = img.height / 2;
    };

    img.onerror = () => {
      img.isLoaded = false;
      console.warn(`Failed to load image: ${src}`);
    };

    img.src = src;
    ImageLoader.cache[src] = img;
    return img;
  };

  public static get = (src: string): LoadedImage | undefined => {
    return ImageLoader.cache[src];
  };

  public static clear = (): void => {
    ImageLoader.cache = {};
  };
}

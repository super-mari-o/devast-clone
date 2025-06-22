/**
 * BGM・SEなどの音声読み込みと再生管理
 */

export interface LoadedSound extends HTMLAudioElement {
  isLoaded: boolean;
}

export class SoundLoader {
  private static cache: Record<string, LoadedSound> = {};

  public static load = (src: string): LoadedSound => {
    if (SoundLoader.cache[src]) return SoundLoader.cache[src];

    const audio = new Audio(src) as LoadedSound;
    audio.isLoaded = false;

    audio.addEventListener('canplaythrough', () => {
      audio.isLoaded = true;
    });

    audio.addEventListener('error', () => {
      audio.isLoaded = false;
      console.warn(`Failed to load sound: ${src}`);
    });

    SoundLoader.cache[src] = audio;
    return audio;
  };

  public static get = (src: string): LoadedSound | undefined => {
    return SoundLoader.cache[src];
  };

  public static clear = (): void => {
    SoundLoader.cache = {};
  };
}

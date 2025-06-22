/**
 * その他ユーティリティ関数群（文字列整形、色変換、デバウンス等）
 */

export namespace Utils {
  export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  };

  export const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
  };

  export const randRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  export const randInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  export const debounce = (fn: (...args: any[]) => void, delay: number): (...args: any[]) => void => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  export const throttle = (fn: (...args: any[]) => void, limit: number): (...args: any[]) => void => {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        fn(...args);
      }
    };
  };

  export const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
}
/**
 * 汎用数学ユーティリティ
 */

export namespace MathUtils {
  export const PI2 = Math.PI * 2;

  export namespace Ease {
    export const speedLimit=(t: number, fun: (t: number) => number, speed: number): number=> {
      return Math.min((speed * t) + fun(t), 1);
    }

    export const linear=(t: number): number=> {
      return t;
    }

    export const outQuad=(t: number): number=> {
      return t * (2 - t);
    }

    export const outCubic=(t: number): number=> {
      return (--t) * t * t + 1;
    }

    export const inOutQuad=(t: number): number=> {
      return (t < 0.5) ? (2 * t * t) : (-1 + (4 - 2 * t) * t);
    }

    export const inQuad=(t: number): number=> {
      return t * t;
    }

    export const inOutCubic=(t: number): number =>{
      return (t < 0.5)
        ? (4 * t * t * t)
        : ((t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
    }

    export const inCubic=(t: number): number=> {
      return t * t * t;
    }

    export const inOutQuart=(t: number): number=> {
      return (t < 0.5)
        ? (8 * t * t * t * t)
        : (1 - 8 * (--t) * t * t * t);
    }

    export const inQuart=(t: number): number=> {
      return t * t * t * t;
    }

    export const outQuart=(t: number): number=> {
      return 1 - (--t) * t * t * t;
    }

    export const outQuint=(t: number): number=> {
      return 1 + (--t) * t * t * t * t;
    }
  }

  export const inflateNumber=(n: number): number=> {
    if (n >= 20000) return (n - 20000) * 1000;
    if (n >= 10000) return (n - 10000) * 100;
    return n;
  }

  export const simplifyNumber=(n: number): string=> {
    if (n >= 10000) {
      const log = Math.floor(Math.log10(n)) - 2;
      const decimal = Math.max(0, 3 - log);
      let str = Math.floor(n / 1000).toString();
      if (decimal) {
        const fraction = ((n % 1000) / 1000).toFixed(decimal).substring(2);
        str += `.${fraction}`.replace(/0+$/, '').replace(/\.$/, '');
      }
      return `${str}k`;
    }
    return n.toString();
  }

  export const beautifyNumber=(value: number): string=> {
    const str = value.toString();
    let result = "";
    for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
      result = str[i] + result;
      if (j === 2 && i > 0 && str[i - 1] !== '-') {
        result = ',' + result;
        j = -1;
      }
    }
    return result;
  }

  export const lerp=(a: number, b: number, t: number): number=> {
    return (1 - t) * a + t * b;
  }

  export const randomizeList=<T>(list: T[], randFn: () => number): T[]=> {
    const array = [...list];
    const result: T[] = [];
    while (array.length > 0) {
      const index = Math.floor(randFn() * array.length);
      result.push(array.splice(index, 1)[0]);
    }
    return result;
  }

  export const reduceAngle=(a1: number, a2: number): number=> {
    return a2 + Math.round((a1 - a2) / PI2) * PI2;
  }
}

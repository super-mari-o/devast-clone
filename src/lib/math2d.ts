/**
 * 2Dベクトル計算
 */


export namespace Math2d {
  export const angle=(ax: number, ay: number, bx: number, by: number): number=> {
    return Math.atan2(by - ay, bx - ax);
  }

  export const dist=(ax: number, ay: number, bx: number, by: number): number=> {
    return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
  }

  export const length=(x: number, y: number): number=> {
    return Math.sqrt(x * x + y * y);
  }

  export const clamp=(value: number, min: number, max: number): number =>{
    return Math.max(min, Math.min(max, value));
  }

  export const normalize=(x: number, y: number): { x: number; y: number }=> {
    const len = length(x, y);
    return len === 0 ? { x: 0, y: 0 } : { x: x / len, y: y / len };
  }

  export const dot=(ax: number, ay: number, bx: number, by: number): number =>{
    return ax * bx + ay * by;
  }

  export const angleBetween=(ax: number, ay: number, bx: number, by: number): number =>{
    const normA = normalize(ax, ay);
    const normB = normalize(bx, by);
    return Math.acos(clamp(dot(normA.x, normA.y, normB.x, normB.y), -1, 1));
  }
}

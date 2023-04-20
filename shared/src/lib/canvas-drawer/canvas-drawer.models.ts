
export type PixelsBatch = Array<[number, number, number, number]>;

export type EventDraw = MouseEvent & TouchEvent & { originalEvent: any; }

export interface SpinType {
  total: number;
  chance: number;
  type: "coin" | "ticket";
  id: number;
}

export interface RouletteData {
  items: SpinType[];
  winId: number;
}

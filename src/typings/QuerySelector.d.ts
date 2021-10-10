export type QuerySelector = {
  <K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K];
  <K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K];
  <E extends Element = Element>(selectors: string): E;
};

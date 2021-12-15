export interface IEdge {
  source: number;
  target: number;
}

export class Edge implements IEdge {
  source: number;
  target: number;

  constructor(src: any, trg: any) {
    this.source = src;
    this.target = trg;
  }

}

export interface INode {
  value: number;
  id: number;
  sDate: string;
  eDate: string;
}

export class TaskNode implements INode {
  id: number;
  value: number;
  eDate: string;
  sDate: string;

  constructor(id: number, value: number) {
    this.value = value;
    this.id = id;
    this.eDate = "";
    this.sDate = "";
  }
}

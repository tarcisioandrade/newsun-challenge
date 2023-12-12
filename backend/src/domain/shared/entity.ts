import { Id } from "../value-objects/id";

export class Entity {
  readonly id: Id;

  constructor(id?: string) {
    this.id = new Id(id);
  }
}

import { Id } from "../value-objects/id";

export class Entity<T extends { id?: string }> {
  readonly id: Id;
  readonly props: T;

  constructor(props: T) {
    this.id = new Id(props.id);
    this.props = { ...props, id: this.id.value };
  }

  toObject() {
    return {
      ...this.props,
    };
  }
}

import { EntityError } from "../shared/entity-error";

const enquadramentos = ["AX", "B1", "B2", "B3"];

export class Enquadramento {
  constructor(readonly value: string) {
    if (!enquadramentos.includes(this.value)) {
      throw new EntityError(
        `O tipo de enquadramento '${this.value}' não é suportado ou não existe.`
      );
    }
  }
}

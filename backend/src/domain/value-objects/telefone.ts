import { EntityError } from "../shared/entity-error";

const TELEFONE_REGEXP = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;

export class Telefone {
  constructor(readonly value: string) {
    if (!this.value.match(TELEFONE_REGEXP)) {
      throw new EntityError("Formato de telefone incorreto.");
    }
  }
}

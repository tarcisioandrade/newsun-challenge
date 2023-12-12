import { ModeloFasicoTypes } from "../entities/unidade";
import { EntityError } from "../shared/entity-error";

const modelosFasicos = ["monofasico", "bifasico", "trifasico"];

export class ModeloFasico {
  constructor(readonly value: ModeloFasicoTypes) {
    if (!modelosFasicos.includes(this.value)) {
      throw new EntityError(
        `O modelo '${this.value}' não é suportado ou não existe.`
      );
    }
  }
}

import { Entity } from "../shared/entity";
import { EntityError } from "../shared/entity-error";
import { Consumo, ConsumoProps } from "../value-objects/consumo";
import { Enquadramento } from "../value-objects/enquadramento";
import { ModeloFasico } from "../value-objects/modelo-fasico";

export interface UnidadeProps {
  id?: string;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: "monofasico" | "bifasico" | "trifasico";
  enquadramento: "AX" | "B1" | "B2" | "B3";
  historicoDeConsumoEmKWH: ConsumoProps[];
}

export class Unidade extends Entity<UnidadeProps> {
  readonly historicoDeConsumoEmKWH: Consumo[];
  readonly enquadramento: Enquadramento;
  readonly modeloFasico: ModeloFasico;

  private constructor(props: UnidadeProps) {
    super(props);
    if (!props.historicoDeConsumoEmKWH.length) {
      throw new EntityError(
        "Por favor, certifique-se de enviar o historico de consumo."
      );
    }
    this.enquadramento = new Enquadramento(props.enquadramento);
    this.modeloFasico = new ModeloFasico(props.modeloFasico);

    if (this.props.historicoDeConsumoEmKWH.length != 12) {
      throw new EntityError(
        `A unidade ${props.codigoDaUnidadeConsumidora} não possui o histórico de consumo dos ultimos 12 meses`
      );
    }
    this.historicoDeConsumoEmKWH = props.historicoDeConsumoEmKWH.map(
      (historic) => new Consumo(historic)
    );
  }

  public static create(props: UnidadeProps): Unidade {
    return new Unidade(props);
  }
}

import { Entity } from "../shared/entity";
import { EntityError } from "../shared/entity-error";
import { Consumo, ConsumoProps } from "../value-objects/consumo";
import { Enquadramento } from "../value-objects/enquadramento";
import { ModeloFasico } from "../value-objects/modelo-fasico";
import { Valor } from "../value-objects/valor";

export interface UnidadeProps {
  valor: number;
  codigoDaUnidadeConsumidora: string;
  modeloFasico: ModeloFasicoTypes;
  enquadramento: EnquadramentoTypes;
  historicoDeConsumoEmKWH: ConsumoProps[];
}

export type EnquadramentoTypes = "AX" | "B1" | "B2" | "B3";

export type ModeloFasicoTypes = "monofasico" | "bifasico" | "trifasico";

export class Unidade extends Entity {
  readonly valor: Valor;
  readonly codigoDaUnidadeConsumidora: string;
  readonly historicoDeConsumoEmKWH: Consumo[];
  readonly enquadramento: Enquadramento;
  readonly modeloFasico: ModeloFasico;

  private constructor(props: UnidadeProps, id?: string) {
    super(id);
    if (!props.historicoDeConsumoEmKWH.length) {
      throw new EntityError(
        "Por favor, certifique-se de enviar o historico de consumo."
      );
    }
    if (props.historicoDeConsumoEmKWH.length != 12) {
      throw new EntityError(
        `A unidade ${props.codigoDaUnidadeConsumidora} não possui o histórico de consumo dos ultimos 12 meses`
      );
    }
    this.valor = new Valor(props.valor);
    this.enquadramento = new Enquadramento(props.enquadramento);
    this.modeloFasico = new ModeloFasico(props.modeloFasico);
    this.codigoDaUnidadeConsumidora = props.codigoDaUnidadeConsumidora;
    this.historicoDeConsumoEmKWH = props.historicoDeConsumoEmKWH.map(
      (historic) => new Consumo(historic)
    );
  }

  public static create(props: UnidadeProps, id?: string): Unidade {
    return new Unidade(props, id);
  }
}

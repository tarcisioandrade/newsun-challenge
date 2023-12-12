import { Entity } from "../shared/entity";
import { EntityError } from "../shared/entity-error";
import { Email } from "../value-objects/email";
import { Id } from "../value-objects/id";
import { Telefone } from "../value-objects/telefone";
import { Unidade, UnidadeProps } from "./unidade";

export interface LeadProps {
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: UnidadeProps[];
}

export class Lead extends Entity {
  readonly nomeCompleto: string;
  readonly email: Email;
  readonly telefone: Telefone;
  readonly unidades: Unidade[];

  private constructor(props: LeadProps, id?: string) {
    super(id);
    if (!props.unidades.length) {
      throw new EntityError(
        "Deve haver no minímo 1 unidade para criar um lead."
      );
    }
    this.nomeCompleto = props.nomeCompleto;
    this.email = new Email(props.email);
    this.telefone = new Telefone(props.telefone);
    this.unidades = props.unidades.map((uni) => Unidade.create(uni));
  }

  public static create(props: LeadProps, id?: string) {
    return new Lead(props, id);
  }

  toObject() {
    return {
      id: this.id.value,
      nomeCompleto: this.nomeCompleto,
      email: this.email.value,
      telefone: this.telefone.value,
      unidades: this.unidades.map((uni) => ({
        valor: uni.valor.getCurrencyFormat(),
        codigoDaUnidadeConsumidora: uni.codigoDaUnidadeConsumidora,
        enquadramento: uni.enquadramento.value,
        modeloFasico: uni.modeloFasico.value,
        historicoDeConsumoEmKWH: uni.historicoDeConsumoEmKWH.map((his) => ({
          consumoForaPontaEmKWH: his.consumoForaPontaEmKWH,
          mesDoConsumo: his.mesDoConsumo,
        })),
      })),
    };
  }
}

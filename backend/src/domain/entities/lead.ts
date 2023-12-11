import { Entity } from "../shared/entity";
import { EntityError } from "../shared/entity-error";
import { Email } from "../value-objects/email";
import { Telefone } from "../value-objects/telefone";
import { Unidade, UnidadeProps } from "./unidade";

export interface LeadProps {
  id?: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: UnidadeProps[];
}

export class Lead extends Entity<LeadProps> {
  readonly email: Email;
  readonly telefone: Telefone;
  readonly unidades: Unidade[];

  private constructor(props: LeadProps) {
    super(props);
    if (!this.props.unidades.length) {
      throw new EntityError(
        "Deve haver no minímo 1 unidade para criar um lead."
      );
    }
    this.unidades = props.unidades.map((uni) => Unidade.create(uni));
    this.email = new Email(props.email);
    this.telefone = new Telefone(props.telefone);
  }

  public static create(props: LeadProps) {
    return new Lead(props);
  }
}

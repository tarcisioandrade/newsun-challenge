import { Unidade, UnidadeProps } from "../entities/unidade";

export interface UnidadeRepository {
  create(input: UnidadeProps[], leadId: string): Promise<Unidade[]>;
}

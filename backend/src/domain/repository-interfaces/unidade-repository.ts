import { Unidade } from "../entities/unidade";

export interface UnidadeRepository {
  create(input: Unidade[], leadId: string): Promise<Unidade[]>;
}

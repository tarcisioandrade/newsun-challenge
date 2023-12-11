import { Unidade } from "./Unidade";

export interface Lead {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  unidades: Unidade[];
}

export interface HistoricoDeConsumoEmKWH {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}

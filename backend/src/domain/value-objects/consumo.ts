export interface ConsumoProps {
  consumoForaPontaEmKWH: number;
  mesDoConsumo: Date;
}

export class Consumo {
  constructor(readonly props: ConsumoProps) {}
}

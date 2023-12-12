export class Valor {
  readonly value: number;

  constructor(valor: number) {
    this.value = valor;
  }

  getCurrencyFormat() {
    const BRLCurrency = new Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      style: "currency",
    }).format(this.value);

    return BRLCurrency;
  }
}

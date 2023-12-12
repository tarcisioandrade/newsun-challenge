import { Unidade, UnidadeProps } from "../entities/unidade";

export function generateHistoricoDeConsumoEmKWH(length: number) {
  return Array.from({ length }, (_, index) => ({
    consumoForaPontaEmKWH: index + 1,
    mesDoConsumo: new Date(),
  }));
}

it("Deve disparar um erro ao tentar criar um sem o historico dos ultimos doze meses", () => {
  let inputUnidade: UnidadeProps = {
    valor: 754.25,
    codigoDaUnidadeConsumidora: "1212",
    enquadramento: "B1",
    modeloFasico: "bifasico",
    historicoDeConsumoEmKWH: generateHistoricoDeConsumoEmKWH(2),
  };

  expect(() => Unidade.create(inputUnidade)).toThrow();
});

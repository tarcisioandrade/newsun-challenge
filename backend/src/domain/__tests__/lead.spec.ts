import { Lead, LeadProps } from "../entities/lead";
import { UnidadeProps } from "../entities/unidade";
import { generateHistoricoDeConsumoEmKWH } from "./unidade.spec";

let inputUnidade: UnidadeProps[];

let inputLead: LeadProps;

describe("Lead Tests", () => {
  beforeEach(() => {
    inputUnidade = [
      {
        valor: 754.25,
        codigoDaUnidadeConsumidora: "1212",
        enquadramento: "B1",
        modeloFasico: "bifasico",
        historicoDeConsumoEmKWH: generateHistoricoDeConsumoEmKWH(12),
      },
    ];

    inputLead = {
      email: "abc@gmail.com",
      nomeCompleto: "Tarcisio",
      telefone: "71984775544",
      unidades: inputUnidade,
    };
  });

  it("Deve criar uma nova lead", () => {
    const lead = Lead.create(inputLead);

    expect(lead.email.value).toEqual(inputLead.email);
  });

  it("Deve disparar um erro ao tentar criar uma lead sem uma unidade", () => {
    inputLead.unidades = [];

    expect(() => Lead.create(inputLead)).toThrow();
  });

  it("Deve disparar um erro ao tentar criar um lead com um e-mail incorreto", () => {
    inputLead.email = "incorrect email";

    expect(() => Lead.create(inputLead)).toThrow();
  });

  it("Deve disparar um erro ao tentar criar um lead com um telefone incorreto", () => {
    inputLead.telefone = "123";

    expect(() => Lead.create(inputLead)).toThrow();
  });
});

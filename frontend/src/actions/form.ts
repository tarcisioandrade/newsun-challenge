"use server";

import { Unidade } from "@/interfaces/unidade";
import { Lead } from "@/interfaces/lead";

const unidadesFake = {
  valor: 7123.29,
  barcode: "836300000715 232900403147 835076709038 101102222763",
  chargingModel: "B1",
  phaseModel: "trifasico",
  unit_key: "4003041512",
  invoice: [
    {
      consumo_fp: 7409,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 9459,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 7345,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 8109,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 7045,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 8722,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 8307,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 7405,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 6320,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 6296,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 8287,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
    {
      consumo_fp: 9036,
      consumo_date: "2022-05-01T00:00:00.000Z",
    },
  ],
  energy_company_id: "0c7efef7-cbbe-46a1-9c0e-67b25ad27933",
};

type ResponseLead = {
  success: boolean;
  lead: Lead;
  message: string;
};

export async function createLead(prevState: any, formData: FormData) {
  const files = formData.getAll("file");
  const unidades: Unidade[] = [];

  let input: any = {
    nomeCompleto: formData.get("name"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
  };

  try {
    for (let i = 0; i < files.length; i++) {
      const fileFormData = new FormData();

      fileFormData.append("file", files[i]);

      // const res = await fetch(
      //   "https://magic-pdf.solarium.newsun.energy/v1/magic-pdf",
      //   {
      //     method: "POST",
      //     body: fileFormData,
      //   }
      // );

      // const unidadeBody: Unidade = await res.json();

      unidades.push(unidadesFake);
    }

    input.unidades = unidades;

    const res = await fetch("http://localhost:3333/create_lead", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    const lead: ResponseLead = await res.json();

    if (!lead.success) {
      throw new Error(lead.message);
    }

    return { success: true, message: null };
  } catch (error: any) {
    console.log("error.message", error.message);
    return { error: true, message: error.message };
  }
}

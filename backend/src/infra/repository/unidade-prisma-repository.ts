import { UnidadeRepository } from "@/domain/repository-interfaces/unidade-repository";
import { UnidadeProps, Unidade } from "@/domain/entities/unidade";
import prisma from "../database/prisma";

export class UnidadePrismaRepository implements UnidadeRepository {
  async create(input: UnidadeProps[], leadId: string) {
    const unidades = input.map((uni) => Unidade.create(uni));

    await prisma.$transaction(async (prismaClient) => {
      for (const unidade of unidades) {
        const {
          codigoDaUnidadeConsumidora,
          enquadramento,
          historicoDeConsumoEmKWH,
          modeloFasico,
        } = unidade.toObject();

        const newUnidade = await prismaClient.unidade.create({
          data: {
            codigoDaUnidadeConsumidora,
            enquadramento,
            modeloFasico,
            leadId,
          },
        });

        const historicoDeConsumoEmKWHComUnidadeId = historicoDeConsumoEmKWH.map(
          (his) => ({
            ...his,
            unidadeId: newUnidade.id,
          })
        );

        await prismaClient.consumo.createMany({
          data: historicoDeConsumoEmKWHComUnidadeId,
        });
      }
    });

    return unidades;
  }
}

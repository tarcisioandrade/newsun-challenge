import { Lead } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import prisma from "../database/prisma";

export class LeadPrismaRepository implements LeadRepository {
  async create(input: Lead) {
    const { unidades, ...rest } = input.toObject();

    const newLead = await prisma.lead.create({
      data: rest,
    });

    return { ...newLead, unidades };
  }

  async getByEmail(email: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        email,
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    return lead;
  }

  async getById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        unidades: {
          select: {
            codigoDaUnidadeConsumidora: true,
            enquadramento: true,
            modeloFasico: true,
            historicoDeConsumoEmKWH: {
              select: {
                mesDoConsumo: true,
                consumoForaPontaEmKWH: true,
              },
            },
          },
        },
      },
    });

    return lead;
  }
}

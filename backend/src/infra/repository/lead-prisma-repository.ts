import { Lead, LeadProps } from "@/domain/entities/lead";
import { LeadRepository } from "@/domain/repository-interfaces/lead-repository";
import prisma from "../database/prisma";

export class LeadPrismaRepository implements LeadRepository {
  async create(input: LeadProps) {
    const lead = Lead.create(input);

    await prisma.lead.create({
      data: {
        id: lead.id.value,
        email: lead.email.value,
        telefone: lead.telefone.value,
        nomeCompleto: lead.nomeCompleto,
      },
    });

    return lead;
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

    if (!lead) return null;

    return Lead.create(lead, lead?.id);
  }

  async getById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        id,
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    if (!lead) return null;

    return Lead.create(lead, lead.id);
  }

  async getAllLeadWithFilter(filter: string) {
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          {
            email: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            nomeCompleto: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            unidades: {
              some: {
                codigoDaUnidadeConsumidora: filter,
              },
            },
          },
        ],
      },
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    return leads.map((lead) => Lead.create(lead, lead.id));
  }

  async getAllLead() {
    const leads = await prisma.lead.findMany({
      include: {
        unidades: {
          include: {
            historicoDeConsumoEmKWH: true,
          },
        },
      },
    });

    return leads.map((lead) => Lead.create(lead, lead.id));
  }
}
